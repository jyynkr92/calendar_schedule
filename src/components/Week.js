import React from "react";
import Day from "./Day";

const Week = ({ line, today, setModal, scheduleList }) => {
  return (
    <>
      <tr>
        {line.map(day => (
          <Day
            day={day}
            today={today}
            setModal={setModal}
            scheduleList={scheduleList}
          ></Day>
        ))}
      </tr>
    </>
  );
};

export default Week;
