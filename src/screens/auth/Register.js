import React, { useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { Redirect, useHistory, Link } from "react-router-dom";
import data from "../../constants";
import "./auth.css";
import RegisterCard from "../../components/Cards/RegisterCard";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [postcode, setPostcode] = useState("");
  const [place, setPlace] = useState("");
  const [checked, setChecked] = useState(false);

  let history = useHistory();

  if (props.isAuth && props.token) {
    history.replace("/home");
  }

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

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

  const registerSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }

    if (!password) {
      alert("Please enter your password");
      return;
    }

    if (!repeatPassword || password != repeatPassword) {
      alert("Please repeat your password");
      return;
    }

    if (!name) {
      alert("Please enter your name");
      return;
    }

    if (!lastName) {
      alert("Please enter your lastName");
      return;
    }

    if (!phone) {
      alert("Please enter your phone");
      return;
    }

    if (!street) {
      alert("Please enter your street");
      return;
    }

    if (!postcode) {
      alert("Please enter your postcode");
      return;
    }

    if (!place) {
      alert("Please enter your place");
      return;
    }

    if (checked == false) {
      alert("Please accept Terms and Conditions");
      return;
    }

    axios
      .post(data.baseUrl + "/api/auth/register", {
        name,
        last_name: lastName,
        phone,
        email,
        password,
        street,
        postcode,
        place,
      })
      .then((res) => {
        console.log(res.data.access_token);
        props.setToken(res.data.access_token);
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("auth", true);

        axios
          .post(data.baseUrl + "/api/auth/me", {
            token: res.data.access_token,
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
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <img src="./burger-bg.png" className="img" />
      <div className="container">
        <div className="">
          <div className="row">
            <div className="col-md-2 col-lg-3 col-sm-2 col-xs-0"></div>
            <div
              className="col-md-8 col-lg-6 col-sm-8 col-xs-12"
              style={{ marginBottom: "50px" }}
            >
              <RegisterCard
                registerSubmit={registerSubmit}
                setChecked={setChecked}
                changeEmail={changeEmail}
                changePassword={changePassword}
                changeRepeatPassword={changeRepeatPassword}
                changeName={changeName}
                changeLastName={changeLastName}
                changePhone={changePhone}
                changePostcode={changePostcode}
                changePlace={changePlace}
                changeStreet
              />
            </div>
            <div className="col-md-2 col-lg-3 col-sm-2 col-xs-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
