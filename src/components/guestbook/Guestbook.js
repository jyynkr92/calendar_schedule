import React from "react";
import GuestName from "./GuestName";
import GuestContents from "./GuestContents";
import GuestButtons from "./GuestButtons";

const Guestbook = ({ guestbook, modifyGuestbook, deleteGuestbook, isAdmin, userId }) => {
  const { guestbookId, contents, userName, userEmail } = guestbook;

  return (
    <div>
      <GuestName userEmail={userEmail} userName={userName} userId={userId} isAdmin={isAdmin} />
      <GuestContents contents={contents} />
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
