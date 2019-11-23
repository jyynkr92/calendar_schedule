import React from "react";
import MemberPhoto from "./MemberPhoto";
import MemberDetail from "./MemberDetail";

const MemberProfile = ({ memberInfo, idx }) => {
  return (
    <>
      {idx % 2 === 0 ? (
        <div>
          <MemberPhoto memberInfo={memberInfo} />
          <MemberDetail memberInfo={memberInfo} />
        </div>
      ) : (
        <div>
          <MemberDetail memberInfo={memberInfo} />
          <MemberPhoto memberInfo={memberInfo} />
        </div>
      )}
    </>
  );
};

export default MemberProfile;
