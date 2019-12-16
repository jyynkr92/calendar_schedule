import React from "react";
import TimelineItem from "./TimelineItem";

const Timeline = ({ year, timelineList }) => {
  const timelines =
    timelineList === null || timelineList === undefined
      ? []
      : timelineList.filter(timeline => {
          return timeline.year === year;
        });

  return (
    <div className="timeline_container">
      {timelines.map(timeline => (
        <TimelineItem timeline={timeline} key={timeline.timeilneId} />
      ))}
    </div>
  );
};

export default Timeline;
