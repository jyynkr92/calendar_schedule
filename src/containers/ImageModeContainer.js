import React, { PureComponent } from "react";
import { connect } from "react-redux";

class ImageModeContainer extends PureComponent {
  render() {
    return <div></div>;
  }
}

const mapStateToProps = state => ({});

const mapToDispatch = dispatch => ({});

export default connect(
  mapStateToProps,
  mapToDispatch
)(ImageModeContainer);
