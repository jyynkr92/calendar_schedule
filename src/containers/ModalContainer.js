import React, { PureComponent } from "react";
import { connect } from "react-redux";
import CustomModal from "../components/CustomModal";
import {
  addScheduleToFirebase,
  closeModal,
  deleteScheduleToFirebase
} from "../modules/schedule";

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
    scheduleId: 1,
    mode: "add"
  };

  componentDidMount() {
    const { selectSchedule } = this.props;

    this.setState({
      title: selectSchedule.title,
      startDate: selectSchedule.startDate,
      startAmPm: selectSchedule.startAmPm,
      startHour: selectSchedule.startHour,
      startMinute: selectSchedule.startMinute,
      endDate: selectSchedule.endDate,
      endAmPm: selectSchedule.endAmPm,
      endHour: selectSchedule.endHour,
      endMinute: selectSchedule.endMinute,
      allDayFlag: selectSchedule.allDayFlag,
      memo: selectSchedule.memo,
      scheduleId: selectSchedule.scheduleId
    });
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

  deleteSchedule = () => {
    const { deleteSchedule } = this.props;
    const { scheduleId } = this.state;
    console.log(scheduleId);
    deleteSchedule(scheduleId);
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
    const { changeInput, addSchedule, closeModal, deleteSchedule } = this;
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
        deleteSchedule={deleteSchedule}
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
  },
  deleteSchedule: scheduleId => {
    dispatch(deleteScheduleToFirebase(scheduleId));
  }
});

export default connect(
  mapStateToProps,
  mapToDispatch
)(ModalContainer);
