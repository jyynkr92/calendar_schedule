import React from "react";
import DayText from "./DayText";
import { getDateFromString } from "../lib/common";

const Day = ({ day, today, setModal, scheduleList, selectSchedule }) => {
  const isToday = today === day.date ? "today" : "";
  const isThisMonth = day.isThisMonth ? "" : "not_thisMonth";
  const classes = `days ${isToday} ${isThisMonth}`;
  const schedules =
    scheduleList === null || scheduleList === undefined
      ? []
      : scheduleList.filter(schedule => {
          const { startDate, endDate } = schedule;
          const calendarDate = getDateFromString(day.date);
          const scheduleStartDate = getDateFromString(startDate);
          const scheduleEndDate = getDateFromString(endDate);

          return calendarDate >= scheduleStartDate && calendarDate <= scheduleEndDate;
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
          key={"schedule" + schedule.scheduleId}
          id={schedule.scheduleId}
          onClick={e => {
            e.stopPropagation();
            console.log(schedule.scheduleId);
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
