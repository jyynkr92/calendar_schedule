import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Homepage from "../components/homepage/Homepage";
import { signOutUser, getUserSession } from "../modules/login";
import firebase from "firebase";

class HomePageContainer extends PureComponent {
  componentDidMount() {
    const { getUserSession } = this.props;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        const email = user.email;
        getUserSession(email);
      } else {
        // No user is signed in.
      }
    });
  }

  render() {
    const { signInStatus, signOutUser } = this.props;
    return (
      <div>
        <Homepage signInStatus={signInStatus} signOutUser={signOutUser} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signInStatus: state.login.signInStatus
});

const mapToDispatch = dispatch => ({
  signOutUser: () => {
    dispatch(signOutUser());
  },
  getUserSession: email => {
    dispatch(getUserSession(email));
  }
});

export default connect(
  mapStateToProps,
  mapToDispatch
)(HomePageContainer);
