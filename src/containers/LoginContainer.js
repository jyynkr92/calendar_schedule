import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Login from "../components/login/Login";
import SignUp from "../components/login/SignUp";
import { setLoginModal, closeLoginModal, signUpUser } from "../modules/login";

class LoginContainer extends PureComponent {
  state = {
    email: "",
    password: "",
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
    const { email, password } = this.state;
    const { signUpUser } = this.props;
    console.log(email_regex.test(email));
    if (!email_regex.test(email)) {
      this.setState({
        warning: "Please Enter Correct Email",
        createCount: false
      });
    } else if (password.length < 8) {
      this.setState({
        warning: "Please Enter Password More Than 8 Characters",
        createCount: false
      });
    } else {
      this.setState({
        warning: "",
        createCount: true
      });

      signUpUser(email, password);
    }
  };

  render() {
    const { setLoginModal, loginModal, closeLoginModal } = this.props;
    const { changeText, availableAccount } = this;
    const { warning } = this.state;

    return (
      <div className="loginDiv">
        <Login setLoginModal={setLoginModal} />
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
  signUpUser: (emai, password) => {
    dispatch(signUpUser(emai, password));
  }
});

export default connect(
  mapStateToProps,
  mapToDispatch
)(LoginContainer);
