import React from "react";
import styled from "styled-components";

const MemberPhoto = ({ memberInfo }) => {
  return (
    <td className="memberInfo memberPhoto">
      <MemberPhotoImg
        isGroup={memberInfo.isGroup}
        src={memberInfo.imageUrl}
        alt={memberInfo.memberName + " 이미지"}
      />
    </td>
  );
};

const MemberPhotoImg = styled.img`
  width: ${props => (props.isGroup ? `80%` : `60%`)};
`;

export default MemberPhoto;
