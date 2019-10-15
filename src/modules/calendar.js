/** define action */
const SET_MONTH = "SET_MONTH";
const INIT_MONTH = "INIT_MONTH";

/** define action function */
export const setMonth = (date, dayList) => ({
  type: SET_MONTH,
  date,
  dayList
});

export const setInitMonth = (date, dayList, today) => ({
  type: INIT_MONTH,
  date,
  dayList,
  today
});

/** define initial state */
const initialState = {
  date: "",
  dayList: [],
  today: ""
};

/** define reducer function */
function calendar(state = initialState, action) {
  switch (action.type) {
    case SET_MONTH:
      return {
        ...state,
        date: action.date,
        dayList: action.dayList
      };
    case INIT_MONTH:
      return {
        date: action.date,
        dayList: action.dayList,
        today: action.today
      };
    default:
      return state;
  }
}

export default calendar;
