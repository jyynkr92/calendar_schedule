import React from "react";
import styled from "styled-components";
import deleteIcon from "../../../img/recycle-bin.png";
import editIcon from "../../../img/pencil.png";

const TimelineItem = ({ timeline, isAdmin, deleteTimeline, setEditModal }) => {
  const getTypeText = () => {
    const { type } = timeline;
    switch (type) {
      case "C":
        return "콘서트";
      case "T":
        return "방송";
      case "R":
        return "라디오";
      case "E":
        return "기타";
      default:
        return "기타";
    }
  };
  return (
    <div className="timeline_item">
      <div className="timeline_item_content">
        <Tag type={timeline.type} className="tag">
          {getTypeText()}
        </Tag>
        <time>
          {timeline.year}-{timeline.month}-{timeline.date}
        </time>
        <TimelineTitle>{timeline.title}</TimelineTitle>
        <TimelineImage>
          {timeline.image ? (
            <img className="timeline_image" src={timeline.image} alt="timeline" />
          ) : null}
        </TimelineImage>
        <TimelineContent>{timeline.content}</TimelineContent>
        {isAdmin ? (
          <div className="iconArea">
            <Icon
              src={deleteIcon}
              data-timelineid={timeline.timelineId}
              onClick={deleteTimeline}
              alt="delete timeline"
            />
            <Icon
              src={editIcon}
              data-timelineid={timeline.timelineId}
              onClick={setEditModal}
              alt="edit timeline"
            />
          </div>
        ) : null}
        <span className="circle" />
      </div>
    </div>
  );
};

const Icon = styled.img`
  width: 20px;
`;

const Tag = styled.span`
  background-color: ${props => {
    const type = props.type;
    switch (type) {
      case "C":
        return "red";
      case "T":
        return "black";
      case "R":
        return "green";
      case "E":
        return "blue";
      default:
        return "blue";
    }
  }};
`;

const TimelineTitle = styled.p`
  margin-top: 5px;
  font-weight: bold;
`;

const TimelineImage = styled.div`
  padding-bottom: 5px;
  width: 100%;
  text-align: center;
`;

const TimelineContent = styled.p``;
export default TimelineItem;
