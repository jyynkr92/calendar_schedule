import React from "react";
import { Modal, Button } from "react-bootstrap";
import mailIcon from "../../img/envelope.png";
import passwordIcon from "../../img/closed-lock.png";

const SignUp = ({ show, onHide, createUser, changeText, warning }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body className="loginModal">
        <div className="inputDiv">
          <span>
            <span>
              <img className="inputImage" src={mailIcon} alt="mailIcon" />
            </span>
          </span>
          <input
            type="text"
            name="email"
            onChange={changeText}
            placeholder="Email"
            className="input_text"
          />
        </div>
        <div className="inputDiv">
          <span>
            <span>
              <img className="inputImage" src={passwordIcon} alt="passwordIcon" />
            </span>
          </span>
          <input
            type="password"
            name="password"
            onChange={changeText}
            placeholder="Password"
            className="input_text"
          />
        </div>
        <div className="warningMsg">{warning}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={createUser}>Create Account</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUp;
