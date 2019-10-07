import React from "react";
import Day from "./Day";

const Week = ({ line, today, setModal }) => {
  return (
    <>
      <tr>
        {line.map(day => (
          <Day day={day} today={today} setModal={setModal}></Day>
        ))}
      </tr>
    </>
  );
};

export default Week;
