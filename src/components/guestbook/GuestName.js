import React from "react";

const GuestName = ({ userEmail, userName, userId, isAdmin }) => {
  return (
    <div>
      {userId === userEmail || isAdmin ? <div>{userEmail}</div> : null}
      <div>{userName}</div>
    </div>
  );
};

export default GuestName;
