import React from "react";
import styled from "styled-components";

const WeekName = ({ name, index, selectImage }) => {
  const keyName = name + "" + index;
  return (
    <WeekNameTD key={keyName} selectImage={selectImage}>
      {name}
    </WeekNameTD>
  );
};

const WeekNameTD = styled.td`
  background-color: ${props => props.selectImage.weekNameColor};
`;

export default WeekName;
