import React from "react";

const MemberDetail = ({ memberInfo }) => {
  return (
    <div className="memberDetail">
      <div>{memberInfo.memberName}</div>
      <div>{memberInfo.memberBio}</div>
    </div>
  );
};

export default MemberDetail;
