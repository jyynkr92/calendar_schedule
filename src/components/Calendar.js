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
      imageList,
      setImage,
      imageShow
    } = this.props;

    return (
      <table id="calendarTable" className="calendar">
        <tbody>
          {mode === "desktop" ? (
            <tr>
              <DesktopImgTD id={selectImage.imageId} rowSpan="8" selectImage={selectImage}>
                <div className="emptyDiv">&nbsp;</div>
              </DesktopImgTD>
            </tr>
          ) : null}
          <MonthSelect
            date={date === "" ? "" : date}
            setCalendar={setCalendar}
            selectImage={selectImage}
            mode={mode}
            setImage={setImage}
            imageList={imageList}
            imageShow={imageShow}
          ></MonthSelect>
          <Month
            dayList={dayList.length === 0 ? [] : dayList}
            today={today}
            setModal={setModal}
            scheduleList={scheduleList}
            selectSchedule={selectSchedule}
            selectImage={selectImage}
            mode={mode}
          ></Month>
        </tbody>
      </table>
    );
  }
}

const DesktopImgTD = styled.td`
  background-image: url(${props => props.selectImage.imageUrl});
  background-size: 100% 100%;
  background-repeat: norepeat;
`;
