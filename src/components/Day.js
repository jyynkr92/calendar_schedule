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
          const dayArr = day.date.split("-");
          const dayYear = Number(dayArr[0]);
          const dayMonth =
            dayArr[1].indexOf("0") === 0
              ? Number(dayArr[1].substring(1))
              : Number(dayArr[1]);
          const dayDate =
            dayArr[2].indexOf("0") === 0
              ? Number(dayArr[2].substring(1))
              : Number(dayArr[2]);

          const calendarDate = new Date(dayYear, dayMonth - 1, dayDate);

          const startArr = schedule.startDate.split("-");
          const startYear = Number(startArr[0]);
          const startMonth =
            startArr[1].indexOf("0") === 0
              ? Number(startArr[1].substring(1))
              : Number(startArr[1]);
          const startDate =
            startArr[2].indexOf("0") === 0
              ? Number(startArr[2].substring(1))
              : Number(startArr[2]);

          const scheduleStartDate = new Date(
            startYear,
            startMonth - 1,
            startDate
          );

          const endArr = schedule.endDate.split("-");
          const endYear = Number(endArr[0]);
          const endMonth =
            endArr[1].indexOf("0") === 0
              ? Number(endArr[1].substring(1))
              : Number(endArr[1]);
          const endDate =
            endArr[2].indexOf("0") === 0
              ? Number(endArr[2].substring(1))
              : Number(endArr[2]);

          const scheduleEndDate = new Date(endYear, endMonth - 1, endDate);

          return (
            calendarDate >= scheduleStartDate && calendarDate <= scheduleEndDate
          );
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
