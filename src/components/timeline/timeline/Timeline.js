import React from "react";

const Timeline = ({ year, timelineList }) => {
  const timelines =
    timelineList === null || timelineList === undefined
      ? []
      : timelineList.filter(timeline => {
          return timeline.year === year;
        });

  return (
    <div>
      {timelines.map(timeline => (
        <div key={timeline.timeilneId}>
          {timeline.title}
          <br />
          {timeline.type}
          <br />
          {timeline.content}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
