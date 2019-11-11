import React from "react";
import styled from "styled-components";

const MenuBar = () => {
  return (
    <MenuList>
      <Menus>Schedule</Menus>
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

const Menus = styled.div`
  display: inline-block;
  padding: 8px 10px 10px 10px;
  font-size: 12pt;
`;

export default MenuBar;
