import React from "react";
import userImg from "../../img/user.png";
import emailImg from "../../img/envelope.png";

const GuestName = ({ userEmail, userName, userId, isAdmin, changeInput }) => {
  return (
    <div className="userName">
      {(userId === userEmail && userId !== "") || isAdmin ? (
        <div>
          <span>
            <img src={emailImg} alt="emailImg" />
          </span>
          <input type="text" value={userEmail} className="userName_text" disabled />
        </div>
      ) : null}
      <span>
        <img src={userImg} alt="userImage" />
      </span>
      {(userId === userEmail && userId !== "") || isAdmin ? (
        <input
          type="text"
          name="userName"
          defaultValue={userName}
          onChange={changeInput}
          placeholder="user name"
          className="userName_text"
        />
      ) : (
        <input
          type="text"
          defaultValue={userName}
          placeholder="user name"
          className="userName_text"
          disabled
        />
      )}
    </div>
  );
};

export default GuestName;
