import React from "react";
import Week from "./Week";
import WeekName from "./WeekName";

const Month = ({ dayList, today, setModal, scheduleList, selectSchedule }) => {
  const weekName = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <>
      <tr>
        {weekName.map((text, index) => (
          <WeekName
            key={"weekName" + index}
            name={text}
            index={index}
          ></WeekName>
        ))}
      </tr>
      {dayList.map((line, index) => (
        <Week
          key={"week" + index}
          line={line}
          today={today}
          setModal={setModal}
          scheduleList={scheduleList}
          selectSchedule={selectSchedule}
        ></Week>
      ))}
    </>
  );
};

export default Month;
