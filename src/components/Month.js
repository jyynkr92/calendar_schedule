import React from "react";
import Week from "./Week";
import WeekName from "./WeekName";

const Month = ({ dayList, today, setModal, scheduleList }) => {
  const weekName = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <>
      <tr>
        {weekName.map((text, index) => (
          <WeekName name={text} index={index}></WeekName>
        ))}
      </tr>
      {dayList.map(line => (
        <Week
          line={line}
          today={today}
          setModal={setModal}
          scheduleList={scheduleList}
        ></Week>
      ))}
    </>
  );
};

export default Month;
