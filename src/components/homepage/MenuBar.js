import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MenuBar = () => {
  return (
    <MenuList>
      <Menus>
        <Link to="/schedule">Schedule</Link>
      </Menus>
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
  padding: 10px 10px 10px 10px;
  font-size: 12pt;
  font-family: "Bree Serif", serif;
  font-weight: bold;
`;

export default MenuBar;