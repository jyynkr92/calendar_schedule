import firestore from "../firebase";

/** define action */
const ADD_SCHEDULE = "ADD_SCHEDULE";
const DELETE_SCHEDULE = "DELETE_SCHEDULE";
const MODIFY_SCHEDULE = "MODIFY_SCHEDULE";
const SELECT_SCHEDULE = "SELECT_SCHEDULE";
const SET_MODAL = "SET_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";
const GET_SCHEDULELIST = "GET_SCHEDULELIST";

/** define action function */
export const setModal = modalDate => ({
  type: SET_MODAL,
  modalDate
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const addSchedule = () => ({
  type: ADD_SCHEDULE
});

export const deleteSchedule = scheduleId => ({
  type: DELETE_SCHEDULE,
  scheduleId
});

export const modifySchedule = schedule => ({
  type: MODIFY_SCHEDULE,
  schedule
});

export const selectSchedule = scheduleId => ({
  type: SELECT_SCHEDULE,
  scheduleId
});

export const getScheduleList = scheduleList => ({
  type: GET_SCHEDULELIST,
  scheduleList
});

export const getScheuleFromFirebase = () => {
  return dispatch => {
    return firestore
      .collection("schedule")
      .get()
      .then(snapshot => {
        var rows = [];
        snapshot.forEach(doc => {
          var childData = doc.data();
          rows.push(childData);
        });

        dispatch(getScheduleList(rows));
      });
  };
};

export const addScheduleToFirebase = schedule => {
  console.log("addScheduleStarted");
  return dispatch => {
    const doc = firestore.collection("schedule");
    const state = initialState;

    schedule.scheduleId = state.lastScheduleId;
    return doc.add(schedule).then(() => {
      dispatch(addSchedule);
    });
  };
};

/** dfine initial state */
const initialState = {
  scheduleList: [],
  lastScheduleId: 1,
  selectSchedule: {
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
  },
  modal: false,
  modalDate: "",
  mode: "add"
};

/** define reduce function */
function schedule(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL:
      return {
        modal: true,
        modalDate: action.modalDate,
        mode: "add"
      };
    case CLOSE_MODAL:
      return {
        modal: false
      };
    case ADD_SCHEDULE:
      return {
        scheduleList: [...state.scheduleList, action.schedule],
        lastScheduleId: state.lastScheduleId + 1
      };
    case DELETE_SCHEDULE:
      return {
        scheduleList: state.scheduleList.filter(schedule => {
          return schedule.scheduleId !== action.scheduleId;
        })
      };
    case MODIFY_SCHEDULE:
      const modifyList = state.scheduleList.map(schedule => {
        return schedule.scheduleId === Number(action.schedule.scheduleId)
          ? {
              ...schedule,
              stateDate: action.schedule.startDate,
              endDate: action.schedule.endDate,
              title: action.schedule.title,
              allDayFlag: action.schedule.allDayFlag,
              memo: action.schedule.memo
            }
          : { ...schedule };
      });

      return {
        scheduleList: modifyList
      };
    case SELECT_SCHEDULE:
      return {
        modal: true,
        mode: "show",
        selectSchedule: state.scheduleList.filter(schedule => {
          return schedule.scheduleId === Number(action.schedule.scheduleId);
        })
      };
    case GET_SCHEDULELIST:
      return {
        scheduleList: action.scheduleList
      };
    default:
      return state;
  }
}

export default schedule;
