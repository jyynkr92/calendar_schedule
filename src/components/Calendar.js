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
      scheduleList
    } = this.props;
    console.log(scheduleList);
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
          ></Month>
        </tbody>
      </table>
    );
  }
}
