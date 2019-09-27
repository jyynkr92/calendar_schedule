import React from "react";
import DayText from "./DayText";

const Day = ({ day }) => {
  return (
    <td className="days">
      <DayText dayName={day}></DayText>
    </td>
  );
};

export default Day;
