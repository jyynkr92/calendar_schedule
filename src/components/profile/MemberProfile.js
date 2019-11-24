import React from "react";
import MemberPhoto from "./MemberPhoto";
import MemberDetail from "./MemberDetail";

const MemberProfile = ({ memberInfo, idx }) => {
  return (
    <>
      {idx % 2 === 0 ? (
        <>
          <tr>
            <MemberPhoto memberInfo={memberInfo} />
            <MemberDetail memberInfo={memberInfo} />
          </tr>
          <tr>
            <td colSpan="2">&nbsp;</td>
          </tr>
        </>
      ) : (
        <>
          <tr>
            <MemberDetail memberInfo={memberInfo} />
            <MemberPhoto memberInfo={memberInfo} />
          </tr>
          <tr>
            <td colSpan="2">&nbsp;</td>
          </tr>
        </>
      )}
    </>
  );
};

export default MemberProfile;
