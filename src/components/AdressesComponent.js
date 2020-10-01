import React, { useState, useReducer } from "react";
import { Radio, Modal, Button } from "react-bootstrap";
import "./Radio.css";
import { Link } from "react-router-dom";
import axios from "axios";
import data from "../constants";
import "./components.css";
import ModalAdresses from "../components/Modals/ModalAdresses";

const AdressesComponent = (props) => {
  const adresses = props.adresses;
  const [dataValid, setDataValid] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkData = () => {
    if (
      props.name &&
      props.lastName &&
      props.phone &&
      props.street &&
      props.postcode &&
      props.place
    ) {
      axios
        .post(data.baseUrl + "/api/check_postcode", {
          postcode: props.postcode,
        })
        .then((res) => {
          setShow(false);
          setDataValid(true);
        })
        .catch((err) => {
          alert("We dont ship here!");
          return false;
        });
      return true;
    } else {
      alert("Please add an adress");
      return false;
    }
  };

  return (
    <div>
      <h1 className="title" id="levering">
        LEVERING
      </h1>
      <hr className="first-hr" />

      {props.user.id ? (
        <div>
          <div>
            <div className="start-div">
              <input type="radio" className="radio" checked />
              Primary adress
              {props.user.id ? (
                <tag className="first-tag">{props.user.adress}</tag>
              ) : (
                ""
              )}
            </div>
            <hr className="first-hr" />
          </div>

          <div>
            <a href="/user_details" className="user-details-link">
              <div className="start-div">
                {/* <input
            type="radio"
            style={{ border: "5px solid #0DFF92", marginRight: "20px" }}
            name="groupOptions"
          /> */}
                <tag className="second-tag">+</tag> New adress
                <br />
              </div>
            </a>
            <hr className="fisrt-hr" />
          </div>
        </div>
      ) : (
        <div>
          {dataValid ? (
            <div>
              <div className="start-div">
                <input type="radio" className="radio" checked />
                Primary adress
                <br />
                <tag className="first-tag">
                  {props.street} {props.postcode} {props.place}
                </tag>
              </div>
              <hr className="first-hr" />
            </div>
          ) : (
            ""
          )}

          <hr className="first-hr" />
          <ModalAdresses
            show={show}
            setShow={setShow}
            handleShow={handleShow}
            handleClose={handleClose}
            checkData={checkData}
            name={props.name}
            changeName={props.changeName}
            lastName={props.lastName}
            changeLastName={props.changeLastName}
            phone={props.phone}
            changePhone={props.changePhone}
            street={props.street}
            changeStreet={props.changeStreet}
            postcode={props.postcode}
            changePostcode={props.changePostcode}
            place={props.place}
            changePlace={props.changePlace}
          />
          {/* Modal add adress */}
        </div>
      )}

      <h1 className="title" id="second-title">
        BETALING
      </h1>
      <hr className="first-hr" />
      <div className="start-div">
        <input
          type="radio"
          className="radio"
          name="groupOptions"
          value="offline"
          onClick={() => {
            props.setPaymentType("on delivery");
          }}
        />
        Betaling ter plaatse
        <br />
      </div>
      <hr className="first-hr" />
      <div className="start-div">
        <input
          type="radio"
          className="radio"
          name="groupOptions"
          value="online"
          onClick={() => {
            props.setPaymentType("online");
          }}
        />
        Online betalen
        <br />
      </div>
      <hr className="first-hr" />
      <button
        className="btn"
        id="checkData-button"
        onClick={() => {
          if (checkData() == true) {
            props.sendOrder();
          }
        }}
      >
        Nu bestellen
      </button>
    </div>
  );
};

export default AdressesComponent;
