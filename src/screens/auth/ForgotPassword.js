import React, { useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { Redirect, useHistory, Link } from "react-router-dom";
import data from "../../constants";
import "./auth.css";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  let history = useHistory();

  //   if (props.isAuth && props.token) {
  //     history.replace("/home");
  //   }

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const sendEmailForgot = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
    }

    axios
      .post(data.baseUrl + "/api/reset_password", {
        email: email,
      })
      .then((res) => {
        console.log(res);
        history.replace("/check_email");
      })
      .catch((err) => {
        alert("There is no account with this email!");
      });
  };

  return (
    <div>
      <img src="./burger-bg.png" className="img" />
      <div className="container">
        <div className="">
          <div className="row">
            <div className="col-md-2 col-lg-3 col-sm-2 col-xs-0"></div>
            <div className="col-md-8 col-lg-6 col-sm-8 col-xs-12">
              <div className="card">
                <div className="card-body">
                  <h1 className="text-center">WACHTWOORD RESETTEN</h1>
                  <h4 className="h4">Vul je e-mail adres in</h4>
                  <br />
                  <form onSubmit={sendEmailForgot}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="e-mail"
                        onChange={changeEmail}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary first-button"
                      id="submitPassword"
                    >
                      Versturen
                    </button>
                    <br />
                    <Link to="/login" style={{ color: "white" }}>
                      Terug naar aanmelden
                    </Link>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-lg-3 col-sm-2 col-xs-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    backgroundColor: "#C4C4C4",
  },
};

export default ForgotPassword;
