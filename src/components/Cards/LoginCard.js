import React, { useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { Redirect, useHistory, Link } from "react-router-dom";
import "../../screens/auth/auth.css";

export default function LoginCard(props) {
  return (
    <div className="card">
      <ProgressBar now={33} className="progressBar" variant="warning" />
      <div className="card-body">
        <h1 className="text-center">INLOGGEN</h1>
        <h4 className="h4">Welkom bij The Burgery</h4>
        <br />
        <form onSubmit={props.loginSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="e-mail"
              onChange={props.changeEmail}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="wachtwoord"
              onChange={props.changePassword}
            />
          </div>
          <Link to="/forgot_password" className="link">
            Wachtwoord vergeten?
          </Link>
          <br />
          <button type="submit" className="btn btn-primary first-button">
            Inloggen
          </button>
          <br />
          <Link to="/postcode">
            <button type="button" className="btn btn-primary second-button ">
              Doorgaan als gast
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
