import React from "react";
import TimelineItem from "./TimelineItem";

const Timeline = ({ timelineList, isAdmin, deleteTimeline, setEditModal }) => {
  return (
    <div className="timeline_container">
      {timelineList.map(timeline => (
        <TimelineItem
          timeline={timeline}
          key={timeline.timelineId}
          isAdmin={isAdmin}
          deleteTimeline={deleteTimeline}
          setEditModal={setEditModal}
        />
      ))}
    </div>
  );
};

export default Timeline;
