import React, { PureComponent } from "react";
import { connect } from "react-redux";
import CalendarContainer from "./CalendarContainer";
import ModeBtn from "../components/ModeBtn";
import SaveImgBtn from "../components/SaveImgBtn";
import { setMode, setImage, getImageListFromFirebase } from "../modules/imagemode";
import html2canvas from "html2canvas";

class ImageModeContainer extends PureComponent {
  state = {
    imageShow: true
  };

  componentDidMount() {
    const { getImageListFromFirebase } = this.props;
    getImageListFromFirebase("mobile");
  }

  componentDidUpdate() {
    const { imageShow } = this.state;
    if (!imageShow) {
      this.saveImage();
    }
  }

  setMode = e => {
    const { mode, getImageListFromFirebase } = this.props;
    const targetMode = e.target.id;

    if (mode !== targetMode) {
      getImageListFromFirebase(targetMode);
    }
  };

  setSaveImage = () => {
    const { imageShow } = this.state;

    this.setState({
      imageShow: !imageShow
    });
  };

  saveImage = () => {
    const { setSaveImage } = this;
    const scale = window.devicePixelRatio;
    const option = {
      scale: scale
    };
    html2canvas(document.getElementById("calendarTable"), option).then(canvas => {
      var imgSrc = canvas.toDataURL("image/png", 1);
      var fileName = "calendar.png";
      var a = document.createElement("a");
      a.href = imgSrc;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        setSaveImage();
      }, 100);
    });
  };

  render() {
    const { mode } = this.props;
    const { setMode, setSaveImage } = this;
    const { imageShow } = this.state;

    return (
      <div>
        <ModeBtn mode={mode} setMode={setMode} />
        <SaveImgBtn setSaveImage={setSaveImage} />
        <CalendarContainer imageShow={imageShow} />
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
  },
  getImageListFromFirebase: mode => {
    dispatch(getImageListFromFirebase(mode));
  }
});

export default connect(
  mapStateToProps,
  mapToDispatch
)(ImageModeContainer);
