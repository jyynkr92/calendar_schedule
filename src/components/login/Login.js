import React from "react";
import mailIcon from "../../img/envelope.png";
import passwordIcon from "../../img/closed-lock.png";

const Login = ({ setLoginModal }) => {
  return (
    <div className="loginBox">
      <div className="loginHeader">Login</div>
      <div className="inputDiv">
        <span>
          <span>
            <img className="inputImage" src={mailIcon} alt="mailIcon" />
          </span>
        </span>
        <input placeholder="Email" className="input_text" />
      </div>
      <div className="inputDiv">
        <span>
          <span>
            <img className="inputImage" src={passwordIcon} alt="passwordIcon" />
          </span>
        </span>
        <input placeholder="Password" className="input_text" />
      </div>
      <div className="inputDiv loginBtn">
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
