import React, { Component } from "react";
import Header from "./Header";
import ImageModeContainer from "../../containers/ImageModeContainer";

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <Header />
        <ImageModeContainer />
      </div>
    );
  }
}
