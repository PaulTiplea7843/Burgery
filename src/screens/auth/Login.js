import React, { useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { Redirect, useHistory, Link } from "react-router-dom";
import data from "../../constants";
import "./auth.css";
import LoginCard from "../../components/Cards/LoginCard";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  if (props.isAuth && props.token) {
    history.replace("/postcode");
  }

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      axios
        .post(data.baseUrl + "/api/auth/login", {
          email,
          password,
        })
        .then((res) => {
          // access token
          console.log(res.data.access_token);
          props.setToken(res.data.access_token);
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("auth", true);

          axios
            .post(data.baseUrl + "/api/auth/me", {
              token: localStorage.getItem("token"),
            })
            .then((res) => {
              console.log(res.data);
              localStorage.setItem("user", JSON.stringify(res.data));
              props.setUser(res.data);
            })
            .catch((err) => console.log(err));

          props.setAuth(true);
          history.replace("/postcode");
        })
        .catch((res) => {
          alert("Bad credentials");
        });
    } else {
      if (!email) {
        alert("Please enter an email");
      }
      if (!password) {
        alert("Please enter a password");
      }
    }
  };

  return (
    <div>
      <img src="./burger-bg.png" className="img" />
      <div className="container">
        <div className="">
          <div className="row">
            <div className="col-md-2 col-lg-3 col-sm-2 col-xs-0"></div>
            <div className="col-md-8 col-lg-6 col-sm-8 col-xs-12">
              <LoginCard
                loginSubmit={loginSubmit}
                changeEmail={changeEmail}
                changePassword={changePassword}
              />
            </div>
            <div className="col-md-2 col-lg-3 col-sm-2 col-xs-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
