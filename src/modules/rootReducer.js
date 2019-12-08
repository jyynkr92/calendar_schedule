import { combineReducers } from "redux";
import calendar from "./calendar";
import schedule from "./schedule";
import imagemode from "./imagemode";
import login from "./login";
import guestbook from "./guestbook";
import profile from "./profile";
import media from "./media";
import timeline from "./timeline";

const rootReducer = combineReducers({
  calendar,
  schedule,
  imagemode,
  login,
  guestbook,
  profile,
  media,
  timeline
});

export default rootReducer;
