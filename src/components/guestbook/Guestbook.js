import React from "react";
import GuestName from "./GuestName";
import GuestContents from "./GuestContents";
import GuestButtons from "./GuestButtons";

const Guestbook = ({
  guestbook,
  modifyGuestbook,
  deleteGuestbook,
  isAdmin,
  userId,
  changeInput
}) => {
  const { guestbookId, contents, userName, userEmail } = guestbook;

  return (
    <div className="guestbook">
      <GuestName
        userEmail={userEmail}
        userName={userName}
        userId={userId}
        isAdmin={isAdmin}
        changeInput={changeInput}
      />
      <GuestContents
        contents={contents}
        userId={userId}
        changeInput={changeInput}
        userEmail={userEmail}
        isAdmin={isAdmin}
      />
      <GuestButtons
        userEmail={userEmail}
        guestbookId={guestbookId}
        modifyGuestbook={modifyGuestbook}
        deleteGuestbook={deleteGuestbook}
        isAdmin={isAdmin}
        userId={userId}
      />
    </div>
  );
};

export default Guestbook;
