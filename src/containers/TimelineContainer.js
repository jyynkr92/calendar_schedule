import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Timeline from "../components/timeline/timeline/Timeline";
import TimelineModalContainer from "./TimelineModalContainer";
import { openModal, getTimelineList, changeYear } from "../modules/timeline";
import styled from "styled-components";

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
    console.log(year);
    changeYear(year);
  };

  render() {
    const { setModal, changeTimelineYear } = this;
    const { modal, timelineList, selectYear } = this.props;
    const { yearList } = this.state;
    return (
      <div>
        <div onClick={setModal}>add timeline</div>
        <YearDiv>
          {yearList.map(year => (
            <YearText
              selectYear={selectYear}
              year={year}
              data-year={year}
              onClick={changeTimelineYear}
            >
              {year}
            </YearText>
          ))}
        </YearDiv>
        <Timeline timelineList={timelineList} />
        {modal ? <TimelineModalContainer /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.timeline.modal,
  timelineList: state.timeline.timelineList,
  selectYear: state.timeline.selectYear
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
