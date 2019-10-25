import React from "react";
import rightArrow from "../img/arrow-point-to-right.png";
import leftArrow from "../img/left-arrow.png";

const MonthSelect = ({ date, setCalendar }) => {
  return (
    <tr className="month_select">
      <th colSpan="7">
        <span>
          <img
            className="arrow_img"
            src={leftArrow}
            alt="left_arrow"
            onClick={() => {
              setCalendar(-1);
            }}
          />
        </span>
        <span className="month_name">{date.substring(0, date.lastIndexOf("-"))}</span>
        <span>
          <img
            className="arrow_img"
            src={rightArrow}
            alt="left_arrow"
            onClick={() => {
              setCalendar(1);
            }}
          />
        </span>
      </th>
    </tr>
  );
};

export default MonthSelect;
