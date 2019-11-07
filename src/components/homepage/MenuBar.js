import React from "react";
import styled from "styled-components";

const MenuBar = () => {
  return (
    <MenuList>
      <span>Schedule</span>
    </MenuList>
  );
};

const MenuList = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #c6cbef;
  height: 39px;
`;

export default MenuBar;
