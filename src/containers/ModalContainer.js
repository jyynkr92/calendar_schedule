import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModal } from "../modules/modal";
import CustomModal from "../components/CustomModal";

class ModalContainer extends Component {
  closeModal = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  render() {
    const { modal, modalDate } = this.props;
    const { closeModal } = this;
    return (
      <CustomModal
        show={modal}
        modalDate={modalDate}
        onHide={closeModal}
      ></CustomModal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal.modal,
  modalDate: state.modal.modalDate
});

const mapToDispatch = dispatch => ({
  closeModal: () => {
    dispatch(closeModal());
  }
});

export default connect(
  mapStateToProps,
  mapToDispatch
)(ModalContainer);
