import React from "react";
import "./components.css";
const CartEmpty = (props) => {
  return (
    <div className="col-md-3 col-sm-0 col-xs-0  d-none d-sm-none  d-md-block body">
      <h1 className="second-title">MIJN BESTELLING</h1>
      <br />
      <br />
      <br />
      <h2 className="subtitle">
        NOG NIKS IN JE <br /> WINKELMANDJE
      </h2>
      <br />
      <br />
      <img src="./empty-burger.png" />
      <br />
      <br />
      <br />
      <br />
      <h2 className="description">
        Log je hier links in of ga door als gast om <br /> te starten met
        bestellen
      </h2>
    </div>
  );
};

export default CartEmpty;
