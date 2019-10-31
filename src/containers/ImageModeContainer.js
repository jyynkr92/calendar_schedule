import React, { PureComponent } from "react";
import { connect } from "react-redux";
import CalendarContainer from "./CalendarContainer";
import ModeBtn from "../components/ModeBtn";
import SaveImgBtn from "../components/SaveImgBtn";
import { setMode, setImage } from "../modules/imagemode";
import html2canvas from "html2canvas";

class ImageModeContainer extends PureComponent {
  setMode = e => {
    const { setMode, mode } = this.props;
    const targetMode = e.target.id;

    if (mode !== targetMode) {
      setMode(targetMode);
    }
  };

  saveImage = () => {
    html2canvas(document.getElementById("calendarTable")).then(canvas => {
      var imgSrc = canvas.toDataURL();
      var fileName = "calendar.png";
      var a = document.createElement("a");
      a.href = imgSrc;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
      }, 100);
    });
  };

  render() {
    const { mode } = this.props;
    const { setMode, saveImage } = this;

    return (
      <div>
        <ModeBtn mode={mode} setMode={setMode} />
        <SaveImgBtn saveImage={saveImage} />
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
  },
  setImage: imageUrl => {
    dispatch(setImage(imageUrl));
  }
});

export default connect(
  mapStateToProps,
  mapToDispatch
)(ImageModeContainer);
