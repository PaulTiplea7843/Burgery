import React, { useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { Redirect, useHistory, Link } from "react-router-dom";
import data from "../../constants";
import "./auth.css";
import CheckEmailCard from "../../components/Cards/CheckEmailCard";

const CheckEmail = (props) => {
  let history = useHistory();

  //   if (props.isAuth && props.token) {
  //     history.replace("/home");
  //   }

  return (
    <div>
      <img src="./burger-bg.png" className="img" />
      <div className="container">
        <div className="">
          <div className="row">
            <div className="col-md-2 col-lg-3 col-sm-2 col-xs-0"></div>
            <div className="col-md-8 col-lg-6 col-sm-8 col-xs-12">
              <CheckEmailCard />
            </div>
            <div className="col-md-2 col-lg-3 col-sm-2 col-xs-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
