import React, { Component } from "react";
import Header from "./Header";
import ImageModeContainer from "../../containers/ImageModeContainer";
import LoginContainer from "../../containers/LoginContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Route exact path="/" component={ImageModeContainer} />
          <Route exact path="/schedule" component={ImageModeContainer} />
          <Route exact path="/login" component={LoginContainer} />
        </Router>
      </div>
    );
  }
}
