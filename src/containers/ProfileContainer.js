import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ProfileHeader from "../components/profile/ProfileHeader";
import MemberProfile from "../components/profile/MemberProfile";
import { getMemberProfileFromFiresotre } from "../modules/profile";

class ProfileContainer extends PureComponent {
  componentDidMount() {
    const { getMemberProfile } = this.props;
    getMemberProfile();
  }

  render() {
    const { memberList, groupInfo, isLoading } = this.props;
    return (
      <>
        {isLoading ? (
          <div className="loadingImageDiv">
            &nbsp;
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
              alt="loadingImage"
              className="loadingImage"
            />
          </div>
        ) : (
          <table className="profileTable">
            <MemberProfile memberInfo={groupInfo} idx="0" />
            {memberList.map((member, idx) => (
              <MemberProfile memberInfo={member} idx={idx + 1} />
            ))}
            <ProfileHeader />
          </table>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  memberList: state.profile.memberList,
  groupInfo: state.profile.groupInfo,
  isLoading: state.profile.isLoading
});

const mapToDispatch = dispatch => ({
  getMemberProfile: () => {
    dispatch(getMemberProfileFromFiresotre());
  }
});

export default connect(mapStateToProps, mapToDispatch)(ProfileContainer);
