import React, { Component } from "react";
import MonthSelect from "./MonthSelect";
import Month from "./Month";

export default class Calendar extends Component {
  render() {
    const {
      date,
      dayList,
      today,
      setCalendar,
      setModal,
      scheduleList,
      selectSchedule
    } = this.props;

    return (
      <table className="calendar">
        <tbody>
          <MonthSelect
            date={date === "" ? "" : date}
            setCalendar={setCalendar}
          ></MonthSelect>
          <Month
            dayList={dayList.length === 0 ? [] : dayList}
            today={today}
            setModal={setModal}
            scheduleList={scheduleList}
            selectSchedule={selectSchedule}
          ></Month>
        </tbody>
      </table>
    );
  }
}
