import React, { useState, useReducer } from "react";
import { Radio, Modal, Button } from "react-bootstrap";
import "../components.css";

export default function ModalAdresses(props) {
  return (
    <>
      <a onClick={props.handleShow} className="user-details-link">
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
      <Modal show={props.show} onHide={props.handleClose} style={{}}>
        <Modal.Header className="modalSection" closeButton closeButton={false}>
          <Modal.Title className="modal-title">MIJN BESTELLING</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalSection">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Naam"
              onChange={props.changeName}
              value={props.name}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Voornaam"
              onChange={props.changeLastName}
              value={props.lastName}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="GSM-nummer"
              onChange={props.changePhone}
              value={props.phone}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Straat en huisnummer"
              onChange={props.changeStreet}
              value={props.street}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Postcode"
              onChange={props.changePostcode}
              value={props.postcode}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Plaats"
              onChange={props.changePlace}
              value={props.place}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="modalSection">
          <Button
            variant="secondary"
            onClick={props.checkData}
            className="saveButton"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
