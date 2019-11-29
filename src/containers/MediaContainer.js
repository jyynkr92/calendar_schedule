import React, { PureComponent } from "react";
import { connect } from "react-redux";
import News from "../components/media/News";
import Video from "../components/media/Video";
import Pagination from "../components/media/Pagination";
import { getNewsList, getVideoList, changeMediaMode } from "../modules/media";
import styled from "styled-components";

class MediaContainer extends PureComponent {
  componentDidMount() {
    const { changeMediaMode } = this.props;
    changeMediaMode("news");
  }

  openNews = url => {
    window.open(url, "_blank");
  };

  openVideo = url => {
    window.open(url, "_blank");
  };

  changeMediaMode = e => {
    const mode = e.target.id;
    const { changeMediaMode } = this.props;

    changeMediaMode(mode);
  };

  moveOnePage = moveToward => {
    const { curPage } = this.props;

    if (moveToward === -1 && curPage === 1) {
      return;
    } else if (moveToward === 10 && curPage === 10) {
      return;
    }

    const nextPage = curPage + moveToward;
    const { movePage } = this;
    movePage(nextPage);
  };

  movePage = pageNum => {
    const { mode, getNewsList, getVideoList } = this.props;

    if (mode === "news") {
      getNewsList(pageNum);
    } else {
      getVideoList(pageNum);
    }
  };

  render() {
    const { mode, newsList, videoList, curPage } = this.props;
    const { openNews, changeMediaMode, openVideo, moveOnePage, movePage } = this;

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
        <Pagination moveOnePage={moveOnePage} movePage={movePage} curPage={curPage} />
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
  videoList: state.media.videoList,
  curPage: state.media.curPage,
  mode: state.media.mode
});

const mapToDispatch = dispatch => ({
  getNewsList: pageNum => {
    dispatch(getNewsList(pageNum));
  },
  getVideoList: pageNum => {
    dispatch(getVideoList(pageNum));
  },
  changeMediaMode: mode => {
    dispatch(changeMediaMode(mode));
  }
});

export default connect(mapStateToProps, mapToDispatch)(MediaContainer);
