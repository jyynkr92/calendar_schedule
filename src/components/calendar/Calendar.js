import React, { Component } from "react";
import MonthSelect from "./MonthSelect";
import Month from "./Month";
import styled from "styled-components";

export default class Calendar extends Component {
  render() {
    const {
      date,
      dayList,
      today,
      setCalendar,
      setModal,
      scheduleList,
      selectSchedule,
      selectImage,
      mode,
      isAdmin
    } = this.props;

    return (
      <CalendarTable id="calendarTable" className="calendar" selectImage={selectImage}>
        <tbody>
          {mode === "desktop" ? (
            <tr>
              <DesktopImgTD id={selectImage.imageId} rowSpan="8" selectImage={selectImage}>
                <div className="emptyDiv">&nbsp;</div>
                <ImageDiv className="imageDiv" selectImage={selectImage}>
                  <img src={selectImage.imageUrl} alt="testImage" />
                </ImageDiv>
              </DesktopImgTD>
            </tr>
          ) : null}
          <MonthSelect
            date={date === "" ? "" : date}
            setCalendar={setCalendar}
            selectImage={selectImage}
            mode={mode}
          ></MonthSelect>
          <Month
            dayList={dayList.length === 0 ? [] : dayList}
            today={today}
            setModal={setModal}
            scheduleList={scheduleList}
            selectSchedule={selectSchedule}
            selectImage={selectImage}
            mode={mode}
            isAdmin={isAdmin}
          ></Month>
        </tbody>
      </CalendarTable>
    );
  }
}

const CalendarTable = styled.table`
  border-collapse: collapse;
  background-size: cover;
  position: relative;
  color: ${props => props.selectImage.fontColor};
  margin-top: 10px;
  margin-bottom: 20px;
`;
const DesktopImgTD = styled.td`
  position: relative;
`;

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.selectImage.topColor};
`;
