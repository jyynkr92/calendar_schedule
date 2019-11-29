import React, { PureComponent } from "react";
import { connect } from "react-redux";
import CalendarContainer from "./CalendarContainer";
import ModeBtn from "../components/imagemode/ModeBtn";
import SaveImgBtn from "../components/imagemode/SaveImgBtn";
import { setMode, setImage, getImageListFromFirebase } from "../modules/imagemode";
import html2canvas from "html2canvas";
import ImageList from "../components/imagemode/ImageList";

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
    window.scroll(0, 0);
    const { setSaveImage } = this;
    const option = {
      scale: 1.5
    };

    html2canvas(document.getElementById("calendarTable"), option).then(canvas => {
      const imgSrc = canvas.toDataURL("image/png", 1);
      const fileName = "calendar.png";
      const a = document.createElement("a");
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

  setImage = e => {
    const imageId = e.target.id;
    const { setImage } = this.props;

    setImage(imageId);
  };

  render() {
    const { mode, imageList, isLoading } = this.props;
    const { setMode, setSaveImage, setImage } = this;
    const { imageShow } = this.state;

    return (
      <div>
        <ModeBtn mode={mode} setMode={setMode} />
        <SaveImgBtn setSaveImage={setSaveImage} />
        {isLoading ? (
          <div className="loadingImageDiv">
            &nbsp;
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
              alt="loadingImage"
              className="loadingImage"
            />
          </div>
        ) : (
          <>
            <div id="imageList">
              <ImageList setImage={setImage} imageList={imageList} />
            </div>
            <CalendarContainer imageShow={imageShow} />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mode: state.imagemode.mode,
  selectImage: state.imagemode.selectImage,
  imageList: state.imagemode.imageList,
  isLoading: state.imagemode.isLoading
});

const mapToDispatch = dispatch => ({
  setMode: mode => {
    dispatch(setMode(mode));
  },
  setImage: imageId => {
    dispatch(setImage(imageId));
  },
  getImageListFromFirebase: mode => {
    dispatch(getImageListFromFirebase(mode));
  }
});

export default connect(mapStateToProps, mapToDispatch)(ImageModeContainer);
