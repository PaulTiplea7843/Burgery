import React, { useState } from "react";
import "../../screens/auth/auth.css";

export default function RegisterCard(props) {
  return (
    <div className="card">
      <div className="card-body">
        <h1 className="text-center">REGISTREREN</h1>
        <br />
        <form onSubmit={props.registerSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="E-mail"
              onChange={props.changeEmail}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Wachtwoord"
              onChange={props.changePassword}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Herhaal wachtwoord"
              onChange={props.changeRepeatPassword}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Naam"
              onChange={props.changeName}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Voornaam"
              onChange={props.changeLastName}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="GSM-nummer"
              onChange={props.changePhone}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Straat en huisnummer"
              onChange={props.changeStreet}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Postcode"
              onChange={props.changePostcode}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Plaats"
              onChange={props.changePlace}
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <tag className="text-left first-tag">
              Bij het aanmaken van dit account verklaar ik akkoord met de
              algemene voorwaarden
            </tag>
            <input
              type="radio"
              onChange={() => {
                props.setChecked(true);
              }}
              name="groupOptions"
              value="online"
              className="radio"
            />
            <br />
            <br />
          </div>

          <button type="submit" className="btn btn-primary first-button">
            Inloggen
          </button>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
}
