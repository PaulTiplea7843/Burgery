import { Redirect, useHistory, Link } from "react-router-dom";
import { Container, ProgressBar } from "react-bootstrap";
import React, { useState } from "react";
import "../../screens/auth/auth.css";

export default function CheckEmailCard(props) {
  return (
    <div className="card">
      <div className="card-body">
        <h1 className="text-center">GESLAAGD!</h1>
        <h4 className="h4">Check je inbox</h4>
        <br />
        <Link to="/login">
          <button
            type="submit"
            className="btn btn-primary first-button"
            id="login-link"
          >
            Aanmelden
          </button>
        </Link>
        <br />
      </div>
    </div>
  );
}
