import React from "react";
import TimelineItem from "./TimelineItem";

const Timeline = ({ timelineList, isAdmin }) => {
  return (
    <div className="timeline_container">
      {timelineList.map(timeline => (
        <TimelineItem timeline={timeline} key={timeline.timelineId} isAdmin={isAdmin} />
      ))}
    </div>
  );
};

export default Timeline;
