import React from "react";
import TimelineItem from "./TimelineItem";

const Timeline = ({ timelineList }) => {
  return (
    <div className="timeline_container">
      {timelineList.map(timeline => (
        <TimelineItem timeline={timeline} key={timeline.timelineId} />
      ))}
    </div>
  );
};

export default Timeline;
