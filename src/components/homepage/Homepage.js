import React from "react";
import Header from "./Header";
import ImageModeContainer from "../../containers/ImageModeContainer";
import LoginContainer from "../../containers/LoginContainer";
import GuestbookContainer from "../../containers/GuestbookContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Homepage = ({ signInStatus, signOutUser }) => {
  return (
    <div>
      <Router>
        <Header signInStatus={signInStatus} signOutUser={signOutUser} />
        <Route exact path="/" component={ImageModeContainer} />
        <Route exact path="/schedule" component={ImageModeContainer} />
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/guestbook" component={GuestbookContainer} />
      </Router>
    </div>
  );
};

export default Homepage;
