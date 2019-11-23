import React from "react";

const MemberPhoto = ({ memberInfo }) => {
  return (
    <div className="memberInfo memberPhoto">
      <img src={memberInfo.imageUrl} alt={memberInfo.memberName + " 이미지"} />
    </div>
  );
};

export default MemberPhoto;
