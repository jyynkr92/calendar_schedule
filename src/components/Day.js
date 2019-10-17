import React from "react";
import DayText from "./DayText";

const Day = ({ day, today, setModal, scheduleList, selectSchedule }) => {
  const isToday = today === day.date ? "today" : "";
  const isThisMonth = day.isThisMonth ? "" : "not_thisMonth";
  const classes = `days ${isToday} ${isThisMonth}`;
  const schedules =
    scheduleList === null || scheduleList === undefined
      ? []
      : scheduleList.filter(schedule => {
          return schedule.startDate === day.date;
        });

  return (
    <td
      className={classes}
      onClick={() => {
        setModal(day.date);
      }}
    >
      <DayText key={day.date} dayName={day.dayNum}></DayText>
      {schedules.map(schedule => (
        <div
          id={schedule.scheduleId}
          onClick={e => {
            e.stopPropagation();
            selectSchedule(schedule.scheduleId, day.date);
          }}
          className="schedule_title"
        >
          {schedule.title}
        </div>
      ))}
    </td>
  );
};

export default Day;
