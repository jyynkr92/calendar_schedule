import React from "react";
import userImg from "../../img/user.png";

const GuestAddContents = ({ addGuestbook, changeInput, addUserName, addContents }) => {
  return (
    <div>
      <div className="guestbook addGuestbook">
        <div className="userName">
          <span>
            <img src={userImg} alt="userImage" />
          </span>
          <input
            type="text"
            name="addUserName"
            value={addUserName}
            onChange={changeInput}
            placeholder="user name"
            className="userName_text"
          />
        </div>
        <div className="guestbookContents">
          <textarea
            className="guestbook_textarea"
            placeholder="contents"
            value={addContents}
            onChange={changeInput}
            name="addContents"
          />
        </div>
        <div className="guestbookButton">
          <span className="actionButton" onClick={addGuestbook}>
            등록
          </span>
        </div>
      </div>
    </div>
  );
};

export default GuestAddContents;
