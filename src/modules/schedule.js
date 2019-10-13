/** define action */
const ADD_SCHEDULE = "ADD_SCHEDULE";
const DELETE_SCHEDULE = "DELETE_SCHEDULE";
const MODIFY_SCHEDULE = "MODIFY_SCHEDULE";
const SELECT_SCHEDULE = "SELECT_SCHEDULE";

/** define action function */
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

/** dfine initial state */
const initialState = {
  scheduleList: [],
  selectedSchedule: {}
};

/** define reduce function */
function schedule(state = initialState, action) {
  switch (action.type) {
    case ADD_SCHEDULE:
      return {
        scheduleList: [...state.scheduleList, action.schedule]
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
        selectedSchedule: state.scheduleList.filter(schedule => {
          return schedule.scheduleId === action.scheduleId;
        })
      };
    default:
      return state;
  }
}

export default schedule;
