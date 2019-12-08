import firestore from "../firebase";

/** define action */
const ADD_SCHEDULE = "ADD_SCHEDULE";
const DELETE_SCHEDULE = "DELETE_SCHEDULE";
const MODIFY_SCHEDULE = "MODIFY_SCHEDULE";
const SELECT_SCHEDULE = "SELECT_SCHEDULE";
const SET_MODAL = "SET_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

/** define action function */
export const setModal = modalDate => ({
  type: SET_MODAL,
  modalDate
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const addSchedule = schedule => ({
  type: ADD_SCHEDULE,
  schedule
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

export const getScheuleFromFirebase = () => {
  return dispatch => {
    return firestore.collection("schedule").onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(change => {
        const childData = change.doc.data();

        if (change.type === "added") {
          dispatch(addSchedule(childData));
        } else if (change.type === "removed") {
          dispatch(deleteSchedule(childData.scheduleId));
        } else if (change.type === "modified") {
          dispatch(modifySchedule(childData));
        }
      });
    });
  };
};

export const addScheduleToFirebase = schedule => {
  return () => {
    const doc = firestore.collection("schedule");
    const docId = doc.doc().id;
    schedule.scheduleId = docId;
    return doc.add(schedule);
  };
};

export const deleteScheduleToFirebase = scheduleId => {
  return dispatch => {
    const doc = firestore.collection("schedule").where("scheduleId", "==", scheduleId);
    return doc.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
      dispatch(closeModal());
    });
  };
};

export const modifyScheduleToFirebase = schedule => {
  return dispatch => {
    const doc = firestore.collection("schedule").where("scheduleId", "==", schedule.scheduleId);
    return doc.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.set(schedule);
      });
      dispatch(closeModal());
    });
  };
};
/** define initial state */
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
        ...state,
        modal: true,
        modalDate: action.modalDate,
        mode: "add"
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: false,
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
        }
      };
    case ADD_SCHEDULE:
      return {
        ...state,
        scheduleList: [].concat(
          state.scheduleList.filter(val => val.scheduleId !== action.schedule.scheduleId),
          action.schedule
        )
      };
    case DELETE_SCHEDULE:
      return {
        ...state,
        scheduleList: state.scheduleList.filter(schedule => {
          return schedule.scheduleId !== action.scheduleId;
        })
      };
    case MODIFY_SCHEDULE:
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
      } = action.schedule;
      const modifyList = state.scheduleList.map(schedule => {
        return schedule.scheduleId === action.schedule.scheduleId
          ? {
              ...schedule,
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
            }
          : { ...schedule };
      });

      return {
        ...state,
        scheduleList: modifyList
      };
    case SELECT_SCHEDULE:
      return {
        ...state,
        modal: true,
        mode: "show",
        selectSchedule: state.scheduleList.filter(schedule => {
          return schedule.scheduleId === action.scheduleId;
        })[0]
      };
    default:
      return state;
  }
}

export default schedule;
