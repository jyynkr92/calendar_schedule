import React from "react";
import styled from "styled-components";
import MenuBar from "./MenuBar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderDiv>
      <LoginBtn>
        <Link className="loginLink" to="/login">
          login
        </Link>
      </LoginBtn>
      <div className="homepageTitle">Forestella</div>
      <MenuBar />
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  width: 100%;
  height: 150px;
  background-color: #8186d5;
  position: relative;
  border-bottom: 1px solid #8186d5;
  margin-bottom: 20px;
  color: #ffffff;
`;

const LoginBtn = styled.div`
  position: absolute;
  right: 0;
  margin-right: 10px;
  font-size: 12pt;
  font-family: "Bree Serif", serif;
  margin-top: 10px;
`;

export default Header;
