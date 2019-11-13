import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Homepage from "../components/homepage/Homepage";
import { signOutUser } from "../modules/login";

class HomePageContainer extends PureComponent {
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
  }
});

export default connect(
  mapStateToProps,
  mapToDispatch
)(HomePageContainer);
