import React from "react";

const GuestContents = ({ contents, userId, changeInput, isAdmin, userEmail }) => {
  return (
    <div className="guestbookContents">
      {(userId === userEmail && userId !== "") || isAdmin ? (
        <textarea
          className="guestbook_textarea"
          defaultValue={contents}
          placeholder="contents"
          onChange={changeInput}
          name="contents"
        />
      ) : (
        <textarea className="guestbook_textarea" value={contents} placeholder="contents" disabled />
      )}
    </div>
  );
};

export default GuestContents;
