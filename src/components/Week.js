import React from "react";
import Day from "./Day";

const Week = ({ line, today, setModal, scheduleList, selectSchedule }) => {
  return (
    <>
      <tr>
        {line.map(day => (
          <Day
            day={day}
            today={today}
            setModal={setModal}
            scheduleList={scheduleList}
            selectSchedule={selectSchedule}
          ></Day>
        ))}
      </tr>
    </>
  );
};

export default Week;
