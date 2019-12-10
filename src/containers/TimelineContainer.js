import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Timeline from "../components/timeline/timeline/Timeline";
import TimelineModalContainer from "./TimelineModalContainer";
import { openModal, getTimeline } from "../modules/timeline";

class TimelineContainer extends PureComponent {
  setModal = () => {
    const { openModal } = this.props;
    openModal();
  };

  render() {
    const { setModal } = this;
    const { modal } = this.props;
    return (
      <div>
        <div onClick={setModal}>add timeline</div>
        <Timeline />
        {modal ? <TimelineModalContainer /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.timeline.modal
});

const mapToDispatch = dispatch => ({
  openModal: () => {
    dispatch(openModal());
  },
  getTimeline: () => {
    dispatch(getTimeline());
  }
});

export default connect(mapStateToProps, mapToDispatch)(TimelineContainer);
