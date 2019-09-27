import React from "react";
import Day from "./Day";

const Week = ({ line }) => {
  return (
    <>
      <tr>
        {line.map((day, index) => (
          <Day day={day}></Day>
        ))}
      </tr>
    </>
  );
};

export default Week;
