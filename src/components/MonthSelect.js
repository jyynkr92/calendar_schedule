import React from "react";
import rightArrow from "../img/arrow-point-to-right.png";
import leftArrow from "../img/left-arrow.png";
import styled from "styled-components";

const MonthSelect = ({ date, setCalendar, selectImage }) => {
  return (
    <CalendarTR>
      <CalendarTH selectImage={selectImage} colSpan="7">
        <MonthBtn>
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
        </MonthBtn>
      </CalendarTH>
    </CalendarTR>
  );
};

const MonthBtn = styled.div`
  position: absolute;
  bottom: 10px;
  right: 0px;
`;

const CalendarTR = styled.tr`
  text-align: center;
`;

const CalendarTH = styled.th`
  background-image: url(${props => props.selectImage});
  background-repeat: no-repeat;
  background-position: center;
  height: 300px;
  background-size: cover;
  position: relative;
`;

export default MonthSelect;
