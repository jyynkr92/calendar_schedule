import React from "react";
import styled from "styled-components";
import { getDateFormatFromDate } from "../../lib/common";

const Video = ({ video, idx, openVideo }) => {
  return (
    <VideoCard
      onClick={() => {
        openVideo(video.url);
      }}
    >
      <div>
        <img className="videoThumbnail" src={video.thumbnail} alt="videoThumnail" />
      </div>
      <VideoTitle>{video.title}</VideoTitle>
      <VideoDate>{getDateFormatFromDate(video.datetime)}</VideoDate>
    </VideoCard>
  );
};

const VideoCard = styled.div`
  border: 1px solid #d9d9d9;
  display: inline-table;
  width: 250px;
  height: 217px;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  text-align: left;
`;

const VideoTitle = styled.div`
  height: 100px;
  font-weight: bold;
  margin-top: 10px;
`;

const VideoDate = styled.div`
  text-align: right;
`;
export default Video;
