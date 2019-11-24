import React from "react";

const MemberDetail = ({ memberInfo }) => {
  return (
    <td className="memberInfo memberDetail">
      <div className="memberName">{memberInfo.memberName}</div>
      <div>
        {memberInfo.memberBio.split("\\n").map(line => {
          return (
            <>
              {line}
              <br />
            </>
          );
        })}
      </div>
    </td>
  );
};

export default MemberDetail;
