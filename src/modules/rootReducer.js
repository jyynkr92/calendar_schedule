import { combineReducers } from "redux";
import calendar from "./calendar";
import schedule from "./schedule";
import imagemode from "./imagemode";
import login from "./login";

const rootReducer = combineReducers({
  calendar,
  schedule,
  imagemode,
  login
});

export default rootReducer;
