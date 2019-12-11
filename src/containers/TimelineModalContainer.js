import React, { PureComponent } from "react";
import { connect } from "react-redux";
import TimelineModal from "../components/timeline/modal/TimelineModal";
import { closeModal, addTimelineToFirebase } from "../modules/timeline";

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

  componentDidMount() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    this.setState({
      content: "",
      type: "C",
      year: year,
      month: month,
      date: date,
      image: "",
      title: ""
    });
  }
  onHide = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  changeInput = (targetName, targetValue) => {
    if (targetName === "date") {
      const dateArr = targetValue.split("-");
      this.setState({
        year: Number(dateArr[0]),
        month: Number(dateArr[1]),
        date: Number(dateArr[2])
      });
    } else {
      this.setState({
        [targetName]: targetValue
      });
    }
  };

  addTimeline = () => {
    const { addTimelineToFirebase } = this.props;
    const { content, type, year, month, date, image, title } = this.state;

    const timeline = { content, type, year, month, date, image, title };
    addTimelineToFirebase(timeline);
  };

  render() {
    const { onHide, changeInput, addTimeline } = this;
    const { modal } = this.props;
    const { content, type, year, month, date, image, title } = this.state;
    return (
      <TimelineModal
        onHide={onHide}
        show={modal}
        content={content}
        type={type}
        year={year}
        month={month}
        date={date}
        imageUrl={image}
        title={title}
        changeInput={changeInput}
        addTimeline={addTimeline}
      ></TimelineModal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.timeline.modal
});

const mapToDispatch = dispatch => ({
  closeModal: () => {
    dispatch(closeModal());
  },
  addTimelineToFirebase: timeline => {
    dispatch(addTimelineToFirebase(timeline));
  }
});

export default connect(mapStateToProps, mapToDispatch)(TimelineModalContainer);
