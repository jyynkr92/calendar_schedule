import React from "react";
import styled from "styled-components";
import MenuBar from "./MenuBar";
import { Link, Redirect } from "react-router-dom";

const Header = ({ signInStatus, signOutUser }) => {
  return (
    <HeaderDiv>
      <LoginBtn>
        {signInStatus ? (
          <>
            <span className="loginLink" onClick={signOutUser}>
              logout
            </span>
            <Redirect to="/" />
          </>
        ) : (
          <Link className="loginLink" to="/login">
            login
          </Link>
        )}
      </LoginBtn>
      <div className="homepageTitle">Forestella</div>
      <MenuBar />
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  width: 100%;
  height: 150px;
  background-color: #d9b99b;
  position: relative;
  border-bottom: 1px solid #d9b99b;
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
