import React from "react";
import rightArrow from "../img/arrow-point-to-right.png";
import leftArrow from "../img/left-arrow.png";
import styled from "styled-components";
import ImageList from "../components/ImageList";

const MonthSelect = ({ date, setCalendar, selectImage, mode, setImage, imageList, imageShow }) => {
  return (
    <CalendarTR>
      <CalendarTH className="topDesign" mode={mode} selectImage={selectImage} colSpan="7">
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
      {imageShow ? (
        <th id="imageList" data-html2canvas-ignore="true" rowspan="8">
          <ImageList setImage={setImage} imageList={imageList} />
        </th>
      ) : null}
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
  ${props =>
    props.mode === "desktop"
      ? `background-color:${props.selectImage.topColor}`
      : `background-image: url(${props.selectImage.imageUrl})`};
  ${props => (props.mode === "desktop" ? `height:211px` : `height:300px`)};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
`;

export default MonthSelect;
