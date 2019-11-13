import React from "react";
import mailIcon from "../../img/envelope.png";
import passwordIcon from "../../img/closed-lock.png";

const Login = ({ setLoginModal, signInUser, changeText }) => {
  return (
    <div className="loginBox">
      <div className="loginHeader">Login</div>
      <div className="inputDiv">
        <span>
          <span>
            <img className="inputImage" src={mailIcon} alt="mailIcon" />
          </span>
        </span>
        <input
          type="text"
          name="loginEmail"
          onChange={changeText}
          placeholder="Email"
          className="input_text"
        />
      </div>
      <div className="inputDiv">
        <span>
          <span>
            <img className="inputImage" src={passwordIcon} alt="passwordIcon" />
          </span>
        </span>
        <input
          type="password"
          onChange={changeText}
          name="loginPassword"
          placeholder="Password"
          className="input_text"
        />
      </div>
      <div className="inputDiv loginBtn" onClick={signInUser}>
        <span>Login</span>
      </div>
      <div className="signUpDiv">
        Now a member?{" "}
        <span onClick={setLoginModal} className="signUp">
          sign up now
        </span>
      </div>
    </div>
  );
};

export default Login;
