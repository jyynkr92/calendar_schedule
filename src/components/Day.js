import React from "react";
import DayText from "./DayText";

const Day = ({ day, today, setModal }) => {
  const isToday = today === day.date ? "today" : "";
  const isThisMonth = day.isThisMonth ? "" : "not_thisMonth";
  const classes = `days ${isToday} ${isThisMonth}`;
  return (
    <td
      className={classes}
      onClick={() => {
        setModal(day.date);
      }}
    >
      <DayText key={day.date} dayName={day.dayNum}></DayText>
    </td>
  );
};

export default Day;
