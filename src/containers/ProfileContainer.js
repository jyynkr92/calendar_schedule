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
    const { memberList, groupInfo } = this.props;
    return (
      <div>
        <ProfileHeader />
        <MemberProfile memberInfo={groupInfo} idx="0" />
        {memberList.map((member, idx) => (
          <MemberProfile memberInfo={member} idx={idx + 1} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  memberList: state.profile.memberList,
  groupInfo: state.profile.groupInfo
});

const mapToDispatch = dispatch => ({
  getMemberProfile: () => {
    dispatch(getMemberProfileFromFiresotre());
  }
});

export default connect(mapStateToProps, mapToDispatch)(ProfileContainer);
