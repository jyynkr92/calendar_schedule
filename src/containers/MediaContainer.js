import React, { PureComponent } from "react";
import { connect } from "react-redux";
import News from "../components/media/News";
import Video from "../components/media/Video";
import { getNewsList, getVideoList } from "../modules/media";
import styled from "styled-components";

class MediaContainer extends PureComponent {
  state = {
    mode: "news"
  };

  componentDidMount() {
    const { getNewsList } = this.props;
    getNewsList();

    const { getVideoList } = this.props;
    getVideoList();
  }

  openNews = url => {
    window.open(url, "_blank");
  };

  openVideo = url => {
    window.open(url, "_blank");
  };

  changeMediaMode = e => {
    const mode = e.target.id;

    this.setState({
      mode
    });
  };

  render() {
    const { newsList, videoList } = this.props;
    const { openNews, changeMediaMode, openVideo } = this;
    const { mode } = this.state;

    return (
      <div>
        <MediaOptionHeader>
          <MediaOption mode={mode} id="news" onClick={changeMediaMode}>
            News
          </MediaOption>
          <MediaOption mode={mode} id="video" onClick={changeMediaMode}>
            Video
          </MediaOption>
        </MediaOptionHeader>
        {mode === "news" ? (
          <>
            {newsList.map((news, idx) => (
              <News news={news} idx={idx} openNews={openNews} />
            ))}
          </>
        ) : (
          <>
            {videoList.map((video, idx) => (
              <Video video={video} idx={idx} openVideo={openVideo} />
            ))}
          </>
        )}
      </div>
    );
  }
}

const MediaOptionHeader = styled.div`
  text-align: center;
`;

const MediaOption = styled.span`
  font-family: "Bree Serif", serif;
  font-size: 15pt;
  margin-right: 10px;
  padding: 0 20px;
  text-decoration: underline;
  cursor: pointer;
  color: ${props => (props.mode === props.id ? "#d9b99b" : "#e4d5b7")};

  &:hover {
    color: #d9b99b;
  }
`;

const mapStateToProps = state => ({
  newsList: state.media.newsList,
  videoList: state.media.videoList
});

const mapToDispatch = dispatch => ({
  getNewsList: () => {
    dispatch(getNewsList());
  },
  getVideoList: () => {
    dispatch(getVideoList());
  }
});

export default connect(mapStateToProps, mapToDispatch)(MediaContainer);
