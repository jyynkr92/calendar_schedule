import { combineReducers } from "redux";
import calendar from "./calendar";
import schedule from "./schedule";
import imagemode from "./imagemode";
import login from "./login";
import guestbook from "./guestbook";

const rootReducer = combineReducers({
  calendar,
  schedule,
  imagemode,
  login,
  guestbook
});

export default rootReducer;
