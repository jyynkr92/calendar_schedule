import { combineReducers } from "redux";
import calendar from "./calendar";
import modal from "./modal";
import schedule from "./schedule";

const rootReducer = combineReducers({
  calendar,
  modal,
  schedule
});

export default rootReducer;
