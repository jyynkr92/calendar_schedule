import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Timeline from "../components/timeline/timeline/Timeline";
import TimelineModalContainer from "./TimelineModalContainer";
import { openModal, getTimelineList } from "../modules/timeline";

class TimelineContainer extends PureComponent {
  state = {
    selectedYear: 0
  };

  setModal = () => {
    const { openModal } = this.props;
    openModal();
  };

  componentDidMount() {
    const { getTimelineList } = this.props;
    getTimelineList();
    const year = new Date().getFullYear();

    this.setState({
      selectedYear: year
    });
  }

  render() {
    const { setModal } = this;
    const { modal, timelineList } = this.props;
    const { selectedYear } = this.state;
    return (
      <div>
        <div onClick={setModal}>add timeline</div>
        <Timeline year={selectedYear} timelineList={timelineList} />
        {modal ? <TimelineModalContainer /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.timeline.modal,
  timelineList: state.timeline.timelineList
});

const mapToDispatch = dispatch => ({
  openModal: () => {
    dispatch(openModal());
  },
  getTimelineList: () => {
    dispatch(getTimelineList());
  }
});

export default connect(mapStateToProps, mapToDispatch)(TimelineContainer);
