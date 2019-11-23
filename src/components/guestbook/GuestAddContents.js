import React from "react";
import userImg from "../../img/user.png";

const GuestAddContents = ({ addGuestbook, changeInput, addUserName, addContents }) => {
  return (
    <div>
      <div className="addGuestbook_alert">
        # 로그인 없이 등록은 가능하나, 수정 및 삭제는 불가능 합니다.
      </div>
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
