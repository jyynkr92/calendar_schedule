import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Login from "../components/login/Login";
import SignUp from "../components/login/SignUp";
import { setLoginModal, closeLoginModal, signUpUser, signInUser } from "../modules/login";

class LoginContainer extends PureComponent {
  state = {
    signUpEmail: "",
    signUpPassword: "",
    loginEmail: "",
    loginPassword: "",
    warning: "",
    createCount: false
  };

  changeText = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  availableAccount = () => {
    const email_regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const { signUpEmail, signUpPassword } = this.state;
    const { signUpUser } = this.props;

    if (!email_regex.test(signUpEmail)) {
      this.setState({
        warning: "Please Enter Correct Email",
        createCount: false
      });
    } else if (signUpPassword.length < 8) {
      this.setState({
        warning: "Please Enter Password More Than 8 Characters",
        createCount: false
      });
    } else {
      this.setState({
        signUpPassword: "",
        signUpEmail: "",
        warning: "",
        createCount: true
      });

      signUpUser(signUpEmail, signUpPassword);
    }
  };

  signInUser = () => {
    const { loginEmail, loginPassword } = this.state;
    const { signInUser } = this.props;
    signInUser(loginEmail, loginPassword);
  };

  render() {
    const { setLoginModal, loginModal, closeLoginModal } = this.props;
    const { changeText, availableAccount, signInUser } = this;
    const { warning } = this.state;

    return (
      <div className="loginDiv">
        <Login setLoginModal={setLoginModal} signInUser={signInUser} changeText={changeText} />
        {loginModal && (
          <SignUp
            changeText={changeText}
            show={loginModal}
            onHide={closeLoginModal}
            createUser={availableAccount}
            warning={warning}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginModal: state.login.loginModal
});

const mapToDispatch = dispatch => ({
  setLoginModal: () => {
    dispatch(setLoginModal());
  },
  closeLoginModal: () => {
    dispatch(closeLoginModal());
  },
  signUpUser: (email, password) => {
    dispatch(signUpUser(email, password));
  },
  signInUser: (email, password) => {
    dispatch(signInUser(email, password));
  }
});

export default connect(
  mapStateToProps,
  mapToDispatch
)(LoginContainer);
