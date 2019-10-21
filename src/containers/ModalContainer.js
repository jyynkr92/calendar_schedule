import React, { PureComponent } from "react";
import { connect } from "react-redux";
import CustomModal from "../components/CustomModal";
import { addScheduleToFirebase, closeModal } from "../modules/schedule";

class ModalContainer extends PureComponent {
  state = {
    title: "",
    startDate: "",
    startAmPm: "오전",
    startHour: "01",
    startMinute: "00",
    endDate: "",
    endAmPm: "오전",
    endHour: "01",
    endMinute: "00",
    allDayFlag: false,
    memo: "",
    scheduleId: 1
  };

  componentDidMount() {
    console.log(this.props.selectSchedule);
  }

  closeModal = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  changeInput = (targetName, targetValue) => {
    this.setState({
      [targetName]: targetValue
    });
  };

  addSchedule = () => {
    const { addSchedule, lastScheduleId } = this.props;
    const {
      title,
      startDate,
      startAmPm,
      startHour,
      startMinute,
      endDate,
      endAmPm,
      endHour,
      endMinute,
      allDayFlag,
      memo
    } = this.state;

    const schedule = {
      title,
      startDate,
      startAmPm,
      startHour,
      startMinute,
      endDate,
      endAmPm,
      endHour,
      endMinute,
      allDayFlag,
      memo,
      scheduleId: lastScheduleId
    };
    addSchedule(schedule);
    this.closeModal();
  };

  render() {
    const { modal } = this.props;
    const {
      startDate,
      endDate,
      title,
      startAmPm,
      startHour,
      startMinute,
      endAmPm,
      endHour,
      endMinute,
      allDayFlag,
      memo,
      lastScheduleId
    } = this.state;
    const { changeInput, addSchedule, closeModal } = this;
    return (
      <CustomModal
        show={modal}
        startDate={startDate}
        endDate={endDate}
        changeInput={changeInput}
        addSchedule={addSchedule}
        title={title}
        startAmPm={startAmPm}
        startHour={startHour}
        startMinute={startMinute}
        endAmPm={endAmPm}
        endHour={endHour}
        endMinute={endMinute}
        allDayFlag={allDayFlag}
        memo={memo}
        onHide={closeModal}
        lastScheduleId={lastScheduleId}
      ></CustomModal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.schedule.modal,
  modalDate: state.schedule.modalDate,
  selectSchedule: state.schedule.selectSchedule,
  scheduleList: state.schedule.scheduleList,
  lastScheduleId: state.schedule.lastScheduleId,
  selectScheduleId: state.schedule.selectScheduleId
});

const mapToDispatch = dispatch => ({
  closeModal: () => {
    dispatch(closeModal());
  },
  addSchedule: schedule => {
    dispatch(addScheduleToFirebase(schedule));
  }
});

export default connect(
  mapStateToProps,
  mapToDispatch
)(ModalContainer);
