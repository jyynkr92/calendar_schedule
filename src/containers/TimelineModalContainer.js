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
    title: "",
    imageUrl: ""
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
      title: "",
      imageUrl: ""
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
    } else if (targetName === "image") {
      let imageUrl = URL.createObjectURL(targetValue);

      this.setState({
        [targetName]: targetValue,
        imageUrl: imageUrl
      });
    } else {
      this.setState({
        [targetName]: targetValue
      });
    }
  };

  addTimeline = () => {
    const { addTimelineToFirebase, closeModal, selectYear } = this.props;
    const { content, type, year, month, date, image, title } = this.state;

    const timeline = { content, type, year, month, date, image, title };
    addTimelineToFirebase(timeline, selectYear);
    closeModal();
  };

  render() {
    const { onHide, changeInput, addTimeline } = this;
    const { modal } = this.props;
    const { content, type, year, month, date, image, title, imageUrl } = this.state;
    return (
      <TimelineModal
        onHide={onHide}
        show={modal}
        content={content}
        type={type}
        year={year}
        month={month}
        date={date}
        imageObj={image}
        title={title}
        changeInput={changeInput}
        addTimeline={addTimeline}
        imageUrl={imageUrl}
      ></TimelineModal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.timeline.modal,
  selectYear: state.timeline.selectYear
});

const mapToDispatch = dispatch => ({
  closeModal: () => {
    dispatch(closeModal());
  },
  addTimelineToFirebase: (timeline, selectYear) => {
    dispatch(addTimelineToFirebase(timeline, selectYear));
  }
});

export default connect(mapStateToProps, mapToDispatch)(TimelineModalContainer);
