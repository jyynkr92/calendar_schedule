import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Timeline from "../components/timeline/timeline/Timeline";
import TimelineModalContainer from "./TimelineModalContainer";
import { openModal, getTimelineList } from "../modules/timeline";

class TimelineContainer extends PureComponent {
  state = {
    yearList: []
  };

  setModal = () => {
    const { openModal } = this.props;
    openModal();
  };

  componentDidMount() {
    const { getTimelineList } = this.props;
    const year = new Date().getFullYear();
    let firstYear = 2017;
    getTimelineList(year);

    const yearList = [];

    while (year >= firstYear) {
      yearList.push(firstYear);
      firstYear++;
    }

    this.setState({
      yearList
    });
  }

  render() {
    const { setModal } = this;
    const { modal, timelineList } = this.props;
    const { yearList } = this.state;
    return (
      <div className="timeline_container">
        <div onClick={setModal}>add timeline</div>
        <div>
          {yearList.map(year => (
            <span>{year}</span>
          ))}
        </div>
        <Timeline timelineList={timelineList} />
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
  getTimelineList: year => {
    dispatch(getTimelineList(year));
  }
});

export default connect(mapStateToProps, mapToDispatch)(TimelineContainer);
