import React, { useState } from "react";
import "./OrderWaiting.css";
import BurgerImage from "../../images/burger-bg.png";
import OrderPlaced from "../../images/OrderPlaced.png";
import axios from "axios";
import data from "../../constants";

const OrderWaiting = (props) => {
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  if (props.orderWaitingId) {
    const checkk = () => {
      axios
        .post(data.baseUrl + "/api/get_order_time", {
          order_id: props.orderWaitingId,
        })
        .then((res) => {
          if (res.data.delivery_time == 0) {
            // the state does not change because the order time was not set
          } else {
            setDeliveryTime(res.data.delivery_time);
            setDeliveryDate(res.data.delivery_date);
            props.setOrderWaitingId("");
            clearInterval(checkorder);
          }
        })
        .catch((err) => {});
    };

    var checkorder = setInterval(function () {
      checkk();
    }, 7000);
  }

  return (
    <div>
      {" "}
      <img
        src={BurgerImage}
        style={{
          width: "100%",
          position: "absolute",
        }}
      />{" "}
      <div className="d-flex justify-content-center align-items-center ordercard">
        <div className="card orderplaced">
          <div>
            <img src={OrderPlaced} alt="OrderPlaced" className="mb-3" />
          </div>
          <div className="order-title-text mb-3">BESTELLING GESLAAGD</div>
          <div className="order-subtitle-text mb-3">
            ONS TEAM DOET ZIJN BEST OM UW BESTELLING BINNEN 30 MINUTEN AF TE
            WERKEN. DE EXACTE TIJD VOOR UW BESTELLING ONTVANGT U VIA E-MAIL EN
            VINDT U HIERONDER TERUG.
          </div>
          <div className="order-waiting-time d-flex justify-content-center align-items-center">
            <div className="wait-time">
              {deliveryTime ? deliveryTime : "IN AFWACHTING"}
              {deliveryDate ? (
                <span>
                  <br />
                  {deliveryDate}
                </span>
              ) : (
                ""
              )}
              {/* ({props.orderWaitingId}) */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderWaiting;
