import React from "react";
import MonthSelect from "./MonthSelect";
import Month from "./Month";

const Calendar = () => {
  return (
    <table className="calendar">
      <tbody>
        <MonthSelect></MonthSelect>
        <Month></Month>
      </tbody>
    </table>
  );
};

export default Calendar;
