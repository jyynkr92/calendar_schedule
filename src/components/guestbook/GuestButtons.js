import React from "react";

const GuestButtons = ({
  userEmail,
  guestbookId,
  modifyGuestbook,
  deleteGuestbook,
  isAdmin,
  userId
}) => {
  return (
    <div className="guestbookButton">
      {(userId === userEmail && userId !== "") || isAdmin ? (
        <>
          <span
            className="actionButton"
            name={guestbookId}
            onClick={() => {
              modifyGuestbook(guestbookId);
            }}
          >
            수정
          </span>
          <span
            className="actionButton"
            name={guestbookId}
            onClick={() => {
              deleteGuestbook(guestbookId);
            }}
          >
            삭제
          </span>
        </>
      ) : null}
    </div>
  );
};

export default GuestButtons;
