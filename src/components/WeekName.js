import React from "react";

const WeekName = ({ name, index }) => {
  const keyName = name + "" + index;
  return (
    <td key={keyName} className="weekName">
      {name}
    </td>
  );
};

export default WeekName;
