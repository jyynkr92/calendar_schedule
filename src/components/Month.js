import React from "react";
import Week from "./Week";
import WeekName from "./WeekName";

const Month = () => {
  const weekName = ["일", "월", "화", "수", "목", "금", "토"];
  const lineNum = [
    [31, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10]
  ];
  return (
    <>
      <tr>
        {weekName.map((text, index) => (
          <WeekName name={text} index={index}></WeekName>
        ))}
      </tr>
      {lineNum.map(line => (
        <Week line={line}></Week>
      ))}
    </>
  );
};

export default Month;
