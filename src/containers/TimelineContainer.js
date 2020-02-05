import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Timeline from "../components/timeline/timeline/Timeline";
import TimelineModalContainer from "./TimelineModalContainer";
import {
  openModal,
  getTimelineList,
  changeYear,
  deleteTimelineToFirebase,
  setEditModal
} from "../modules/timeline";
import addTimeline from "../img/add-event.png";
import styled from "styled-components";

class TimelineContainer extends PureComponent {
  state = {
    yearList: []
  };

  setModal = () => {
    const { openModal } = this.props;
    openModal();
  };

  deleteTimeline = e => {
    const { deleteTimelineToFirebase, selectYear } = this.props;
    const timelineId = e.target.getAttribute("data-timelineid");
    deleteTimelineToFirebase(timelineId, selectYear);
  };

  componentDidMount() {
    const { getTimelineList } = this.props;
    let year = new Date().getFullYear();
    const firstYear = 2017;
    getTimelineList(year);

    const yearList = [];

    while (year >= firstYear) {
      yearList.push(year);
      year--;
    }

    this.setState({
      yearList
    });
  }

  changeTimelineYear = e => {
    const { changeYear } = this.props;
    const year = e.target.getAttribute("data-year");
    changeYear(year);
  };

  setEditModal = e => {
    const timelineId = e.target.getAttribute("data-timelineid");
    const { setEditModal } = this.props;

    setEditModal(timelineId);
  };

  render() {
    const { setModal, changeTimelineYear, deleteTimeline, setEditModal } = this;
    const { modal, timelineList, selectYear, userId, isAdmin } = this.props;
    const { yearList } = this.state;
    return (
      <div>
        {userId !== "" && isAdmin ? (
          <div>
            <IimelineIcon src={addTimeline} alt="add_timeline_icon" onClick={setModal} />
          </div>
        ) : null}
        <YearDiv>
          {yearList.map(year => (
            <YearText
              selectYear={selectYear}
              year={year}
              data-year={year}
              onClick={changeTimelineYear}
              key={"timeline" + year}
            >
              {year}
            </YearText>
          ))}
        </YearDiv>
        <Timeline
          timelineList={timelineList}
          isAdmin={isAdmin}
          deleteTimeline={deleteTimeline}
          setEditModal={setEditModal}
        />
        {modal ? <TimelineModalContainer /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.timeline.modal,
  timelineList: state.timeline.timelineList,
  selectYear: state.timeline.selectYear,
  isAdmin: state.login.isAdmin,
  userId: state.login.userId
});

const mapToDispatch = dispatch => ({
  openModal: () => {
    dispatch(openModal());
  },
  getTimelineList: year => {
    dispatch(getTimelineList(year));
  },
  changeYear: year => {
    dispatch(changeYear(year));
  },
  deleteTimelineToFirebase: (timelineId, selectYear) => {
    dispatch(deleteTimelineToFirebase(timelineId, selectYear));
  },
  setEditModal: timelineId => {
    dispatch(setEditModal(timelineId));
  }
});

export default connect(mapStateToProps, mapToDispatch)(TimelineContainer);

/** design */
const YearDiv = styled.div`
  text-align: center;
  font-size: 25px;
`;

const YearText = styled.span`
  margin-right: 10px;
  font-weight: bold;
  color: #8c7967;
  padding: 5px 5px 0px;
  ${props => (Number(props.selectYear) === props.year ? `border-bottom : 4px solid #8c7966` : null)}

  &:hover {
    border-bottom: 4px solid #8c7966;
    cursor: pointer;
  }
`;

const IimelineIcon = styled.img`
  cursor: pointer;
  width: 30px;
  float: right;
`;
