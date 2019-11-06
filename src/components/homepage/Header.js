import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderDiv>
      <div>
        <span>login</span>
        <span>/</span>
        <span>signup</span>
      </div>
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  width: 100%;
  height: 150px;
  background-color: #d9d9d9;
`;

export default Header;
