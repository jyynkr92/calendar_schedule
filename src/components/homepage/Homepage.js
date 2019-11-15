import React from "react";
import Header from "./Header";
import ImageModeContainer from "../../containers/ImageModeContainer";
import LoginContainer from "../../containers/LoginContainer";
import RequestContainer from "../../containers/GuestBookContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Homepage = ({ signInStatus, signOutUser }) => {
  return (
    <div>
      <Router>
        <Header signInStatus={signInStatus} signOutUser={signOutUser} />
        <Route exact path="/" component={ImageModeContainer} />
        <Route exact path="/schedule" component={ImageModeContainer} />
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/request" component={RequestContainer} />
      </Router>
    </div>
  );
};

export default Homepage;
