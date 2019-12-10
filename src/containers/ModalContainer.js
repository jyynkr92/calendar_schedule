import React, { PureComponent } from "react";
import { connect } from "react-redux";
import CustomModal from "../components/modal/CustomModal";
import {
  addScheduleToFirebase,
  closeModal,
  deleteScheduleToFirebase,
  modifyScheduleToFirebase
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
    const { selectSchedule, modalDate, mode } = this.props;
    let {
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
      scheduleId
    } = selectSchedule;

    startDate = startDate || modalDate;
    endDate = endDate || modalDate;

    this.setState({
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
      scheduleId,
      mode
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
    deleteSchedule(scheduleId);
  };

  modifyScheudle = () => {
    const { modifySchedule } = this.props;
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
      memo,
      scheduleId
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
      scheduleId
    };

    modifySchedule(schedule);
  };

  render() {
    const { modal, isAdmin } = this.props;
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
      lastScheduleId,
      mode
    } = this.state;
    const { changeInput, addSchedule, closeModal, deleteSchedule, modifyScheudle } = this;
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
        mode={mode}
        modifyScheudle={modifyScheudle}
        isAdmin={isAdmin}
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
  mode: state.schedule.mode,
  isAdmin: state.login.isAdmin
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
  },
  modifySchedule: schedule => {
    dispatch(modifyScheduleToFirebase(schedule));
  }
});

export default connect(mapStateToProps, mapToDispatch)(ModalContainer);
