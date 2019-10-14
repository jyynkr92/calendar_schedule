import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { closeModal } from "../modules/modal";
import CustomModal from "../components/CustomModal";
import { addSchedule } from "../modules/schedule";

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
    memo: ""
  };

  componentDidMount() {
    this.setState({
      startDate: this.props.modalDate,
      endDate: this.props.modalDate
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
    const { addSchedule } = this.props;
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
      memo
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
      memo
    } = this.state;
    const { changeInput, addSchedule } = this;
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
      ></CustomModal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal.modal,
  modalDate: state.modal.modalDate,
  scheduleForm: state.schedule.scheduleForm
});

const mapToDispatch = dispatch => ({
  closeModal: () => {
    dispatch(closeModal());
  },
  addSchedule: schedule => {
    dispatch(addSchedule(schedule));
  }
});

export default connect(
  mapStateToProps,
  mapToDispatch
)(ModalContainer);
