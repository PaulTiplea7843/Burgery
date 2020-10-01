import React, { useState } from "react";
import CartEmpty from "../components/CartEmpty";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import data from "../constants";
import AdressesComponent from "../components/AdressesComponent";
import { Modal, Button } from "react-bootstrap";
import ModalCoupon from "../components/Modals/ModalCoupon";
import "./components.css";

import {
  faTrashAlt,
  faTrashRestoreAlt,
} from "@fortawesome/free-solid-svg-icons";

const ModalContent = (props) => {
  var [adresses, setAdresses] = useState([]);
  const user = props.user;
  const [name, setName] = useState(user ? user.name : "");
  const [lastName, setLastName] = useState(user ? user.last_name : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [street, setStreet] = useState(user ? user.street : "");
  const [postcode, setPostcode] = useState(user ? user.postcode : "");
  const [place, setPlace] = useState(user ? user.place : "");
  const [payUrl, setPayUrl] = useState("");
  // const [street, setStreet] = useState("street");
  // const [postcode, setPostcode] = useState("postcode");
  // const [place, setPlace] = useState("place");
  const [show, setShow] = useState(false);
  const [paying, setPaying] = useState(0);
  const [payingId, setPayingId] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showCoupon, setShowCoupon] = useState(false);

  const handleCloseCoupon = () => setShowCoupon(false);
  const handleShowCoupon = () => setShowCoupon(true);
  const [couponCode, setCouponCode] = useState("");

  const changeCoupon = (e) => {
    setCouponCode(e.target.value);
  };

  const checkCoupon = () => {
    if (couponCode) {
      axios
        .post(data.baseUrl + "/api/check_coupon", {
          code: couponCode,
        })
        .then((res) => {
          props.setCoupon(res.data.coupon);
          alert("Coupon added");
        })
        .catch((err) => {
          alert("Invalid coupon code");
        });

      return;
    } else {
      alert("Please enter a coupon code!");
    }
  };

  if (payingId != 0 && paying == 1) {
    const checkk = () => {
      axios
        .get(data.baseUrl + "/api/auth/order_status/" + payingId)
        .then((res) => {
          if (res.data.status == 1) {
            setPaying(0);
            setPayingId(0);
            clearInterval(checkorder);
            alert("Thank you for your order");
            localStorage.removeItem("cart");
            localStorage.removeItem("sauces");
            window.location.replace("/orderwaiting");
          }
        })
        .catch((err) => {});
    };

    var checkorder = setInterval(function () {
      checkk();
    }, 7000);
  }

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  const changePhone = (e) => {
    setPhone(e.target.value);
  };

  const changeStreet = (e) => {
    setStreet(e.target.value);
  };

  const changePostcode = (e) => {
    setPostcode(e.target.value);
  };

  const changePlace = (e) => {
    setPlace(e.target.value);
  };

  if (props.cart.length == 0) {
    return <CartEmpty />;
  }

  var total = 0;
  for (let i = 0; i <= props.cart.length - 1; i++) {
    total += props.cart[i].price;
  }
  for (let i = 0; i <= props.sauces.length - 1; i++) {
    total += props.sauces[i].price;
  }

  if (props.coupon && props.coupon.min_total) {
    if (total >= props.coupon.min_total) {
      if (props.coupon.type == 0) {
        total -= props.coupon.value;
      } else {
        total -= (props.coupon.value / 100) * total;
      }
    }
  }

  const checkData = () => {
    if (name && lastName && phone && street && postcode && place) {
      return true;
    } else {
      return false;
    }
  };

  function sendOrder() {
    if (props.cart.length == 0) {
      alert("Please add products in your cart!");
    }
    if (!props.paymentType) {
      alert("Please select a payment method");
      return;
    }

    if (!checkData()) {
      alert("Please complete your adress details");
      return;
    }

    // adress took from logged in user !!! at least thats what I hope :)
    console.log("#######SEND ORDER INFO############");

    const paymentType = props.paymentType;
    const deliveryType = props.type;
    const time = props.time; // if 0 = asap / if 1 => pick time interval
    const deliveryTime = props.deliveryTime;

    console.log("name: " + name);
    console.log("lastName: " + lastName);
    console.log("phone: " + phone);
    console.log("street: " + street);
    console.log("postcode: " + postcode);
    console.log("place: " + place);
    console.log("paymentType: " + paymentType);
    console.log("deliveryType: " + deliveryType);
    console.log("time: " + time);
    console.log("deliveryTime: " + deliveryTime);
    console.log("sauces: ");
    console.log(props.sauces);
    // Sauces to be added!
    const products = props.cart;
    console.log(props.cart);

    console.log("##################################");

    axios
      .post(data.baseUrl + "/api/create_order", {
        // user token
        token: props.token,
        // order details
        paymentType,
        deliveryType,
        time,
        deliveryTime,
        // user details
        name,
        lastName,
        phone,
        street,
        postcode,
        place,
        products: props.cart,
        sauces: props.sauces,
        coupon_id: props.coupon.id,
      })
      .then((res) => {
        console.log(res);
        props.setOrderWaitingId(res.data.order_id);
        localStorage.setItem("orderWaitingId", res.data.order_id);
        if (res.data.payment_type == "online") {
          // open payment modal <3
          // setPayUrl(res.data.payment_url);
          setPaying(1);
          // alert(res.data.order_id);
          setPayingId(res.data.order_id);
          window.open(res.data.payment_url, "_blank");
          // handleShow();
        } else {
          // pay on delivery => redirect to thank you page / alert smth?
          alert("Thank you for your order!");
          localStorage.removeItem("cart");
          localStorage.removeItem("sauces");
          window.location.replace("/orderwaiting");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Bestel nu toggle animation
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      console.log("")
    );

    return (
      <button
        className="btn"
        style={{
          marginTop: "30px",
          width: "100%",
          padding: "20px 0px",
          backgroundColor: "#F2A83B",
          color: "white",
          fontWeight: "bold",
        }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  const getAdresses = () => {
    if (adresses.length == 0) {
      axios
        .get(data.baseUrl + "/api/auth/my_adresses", {
          params: {
            token: props.token,
          },
        })
        .then((res) => {
          console.log(res.data.adresses);
          setAdresses(res.data.adresses);
          // setCategories(res.data.categories);
          // console.log(categories);
        });
    }
    setTimeout(function () {
      document.getElementById("bestel_nu").style.display = "none";
    }, 300);

    document.getElementById("levering").style.marginTop = "50px";
  };

  const removeItem = (index) => {
    let newProds = props.cart.filter((product, i) => {
      if (i == index) {
        return false;
      }
      return true;
    });
    props.setCart(newProds);
    localStorage.setItem("cart", JSON.stringify(newProds));
  };

  const removeSauce = (index) => {
    let newSauces = props.sauces.filter((sauce, i) => {
      if (i == index) {
        return false;
      }
      return true;
    });
    props.setSauces(newSauces);
    localStorage.setItem("sauces", JSON.stringify(newSauces));
  };

  return (
    <div className="col-md-12 container">
      <h1 className="second-title">MIJN BESTELLING</h1>
      <br />
      <br />
      <br />
      {props.cart.map((product, index) => {
        return (
          <div>
            <hr className="second-hr" />
            <h2 className="text-left subtitle">
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="icon"
                onClick={() => removeItem(index)}
              />
              {product.name}
              <b className="float-right">€{product.price}</b>
            </h2>
            <hr className="third-hr" />
          </div>
        );
      })}
      {props.sauces.map((sauce, index) => {
        return (
          <div>
            <hr className="second-hr" />
            <h2 className="text-left subtitle">
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="icon"
                onClick={() => removeSauce(index)}
              />
              {sauce.name}
              <b className="float-right">€{sauce.price}</b>
            </h2>
            <hr className="third-hr" />
          </div>
        );
      })}
      {props.coupon.code ? (
        <div>
          <hr className="second-hr" />
          <h2 className="text-left subtitle">
            "{props.coupon.code}"
            <b className="float-right">
              {props.coupon.type == 0
                ? "€" + props.coupon.value
                : "%" + props.coupon.value}{" "}
              (€{props.coupon.min_total}+)
            </b>
          </h2>
          <hr className="third-hr" />
        </div>
      ) : (
        ""
      )}
      <ModalCoupon
        handleShowCoupon={handleShowCoupon}
        showCoupon={showCoupon}
        handleCloseCoupon={handleCloseCoupon}
        changeCoupon={changeCoupon}
        checkCoupon={checkCoupon}
      />
      <div className="float-right text-white total-section">
        <tag className="third-tag">Totaal:</tag>
        <tag className="fourth-tag">
          €{(Math.round(total * 100) / 100).toFixed(2)}
        </tag>
      </div>
      <br />
      <Accordion defaultActiveKey="0">
        <div className="cart">
          <div className="card-header">
            <a onClick={() => getAdresses()} id="bestel_nu">
              <CustomToggle eventKey="1">Bestel nu</CustomToggle>
            </a>
          </div>
          <Accordion.Collapse eventKey="1">
            <AdressesComponent
              paymentType={props.paymentType}
              setPaymentType={props.setPaymentType}
              sendOrder={sendOrder}
              adresses={adresses}
              token={props.token}
              user={props.user}
              changeName={changeName}
              changeLastName={changeLastName}
              changePhone={changePhone}
              changeStreet={changeStreet}
              changePostcode={changePostcode}
              changePlace={changePlace}
              name={name}
              lastName={lastName}
              phone={phone}
              street={street}
              postcode={postcode}
              place={place}
            />
          </Accordion.Collapse>
        </div>
      </Accordion>
      {/* 
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <iframe src={payUrl} style={{ width: "100%", height: "400px" }} />
        </Modal.Body>
      </Modal> */}
    </div>
  );
};

export default ModalContent;
