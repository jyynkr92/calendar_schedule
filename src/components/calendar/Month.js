import React from "react";
import Week from "./Week";
import WeekName from "./WeekName";

const Month = ({
  dayList,
  today,
  setModal,
  scheduleList,
  selectSchedule,
  selectImage,
  isAdmin
}) => {
  const weekName = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <>
      <tr>
        {weekName.map((text, index) => (
          <WeekName
            key={"weekName" + index}
            name={text}
            index={index}
            selectImage={selectImage}
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
          selectImage={selectImage}
          isAdmin={isAdmin}
        ></Week>
      ))}
    </>
  );
};

export default Month;
