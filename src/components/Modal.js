import React from "react";

const Modal = ({ modalDate, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        here is modal! <br />
        {modalDate}
      </div>
    </div>
  );
};

export default Modal;
