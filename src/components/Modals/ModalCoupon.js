import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../components.css";

export default function ModalCoupon(props) {
  return (
    <>
      <span className="show-button" onClick={props.handleShowCoupon}>
        Coupon?
      </span>
      <br />
      <br />

      <Modal show={props.showCoupon} onHide={props.handleCloseCoupon}>
        <Modal.Header closeButton className="modalSection">
          <Modal.Title>Add coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalSection">
          <div className="form-group">
            <label>Coupon code:</label>
            <input
              className="form-control"
              name="coupon"
              required
              placeholder="code"
              onChange={props.changeCoupon}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="modalSection">
          <Button variant="secondary" onClick={props.handleCloseCoupon}>
            Close
          </Button>
          <Button
            variant="primary"
            className="check-button"
            onClick={props.checkCoupon}
          >
            Check coupon
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
