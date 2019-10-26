import { combineReducers } from "redux";
import calendar from "./calendar";
import schedule from "./schedule";
import imagemode from "./imagemode";

const rootReducer = combineReducers({
  calendar,
  schedule,
  imagemode
});

export default rootReducer;
