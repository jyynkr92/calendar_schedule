import React, { PureComponent } from "react";
import { connect } from "react-redux";
import TimelineModal from "../components/timeline/modal/TimelineModal";
import { closeModal } from "../modules/timeline";

class TimelineModalContainer extends PureComponent {
  state = {
    content: "",
    type: "",
    year: "",
    month: "",
    date: "",
    image: "",
    title: ""
  };

  onHide = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  changeInput = (targetName, targetValue) => {
    this.setState({
      [targetName]: targetValue
    });
  };

  render() {
    const { onHide } = this;
    const { modal } = this.props;
    return <TimelineModal onHide={onHide} show={modal}></TimelineModal>;
  }
}

const mapStateToProps = state => ({
  modal: state.timeline.modal
});

const mapToDispatch = dispatch => ({
  closeModal: () => {
    dispatch(closeModal());
  }
});

export default connect(mapStateToProps, mapToDispatch)(TimelineModalContainer);
