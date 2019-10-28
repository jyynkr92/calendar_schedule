import React, { PureComponent } from "react";
import { connect } from "react-redux";
import CalendarContainer from "./CalendarContainer";
import ModeBtn from "../components/ModeBtn";
import SaveImgBtn from "../components/SaveImgBtn";
import { setMode } from "../modules/imagemode";

class ImageModeContainer extends PureComponent {
  setMode = e => {
    const { setMode, mode } = this.props;
    const targetMode = e.target.id;

    if (mode !== targetMode) {
      setMode(targetMode);
    }
  };

  render() {
    const { mode } = this.props;
    const { setMode } = this;

    return (
      <div>
        <ModeBtn mode={mode} setMode={setMode} />
        <SaveImgBtn />
        <CalendarContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mode: state.imagemode.mode,
  selectImage: state.imagemode.selectImage
});

const mapToDispatch = dispatch => ({
  setMode: mode => {
    dispatch(setMode(mode));
  }
});

export default connect(
  mapStateToProps,
  mapToDispatch
)(ImageModeContainer);
