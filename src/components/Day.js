import React from "react";
import DayText from "./DayText";
import { getDateFromString } from "../lib/common";
import styled from "styled-components";

const Day = ({ day, today, setModal, scheduleList, selectSchedule, selectImage }) => {
  const isToday = today === day.date ? "today" : "";
  const isThisMonth = day.isThisMonth ? "" : "not_thisMonth";
  const classes = `${isToday} ${isThisMonth}`;
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
    <DayTD
      className={classes}
      selectImage={selectImage}
      onClick={() => {
        setModal(day.date);
      }}
    >
      <DayText key={day.date} dayName={day.dayNum}></DayText>
      {schedules.map(schedule => (
        <div
          key={"schedule" + schedule.scheduleId + "_" + day.date}
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
    </DayTD>
  );
};

const DayTD = styled.td`
  height: 80px;
  vertical-align: top;
  width: 80px;
  background-color: ${props => props.selectImage.backgroundColor};
`;

export default Day;
