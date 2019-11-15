import React from "react";
import Guestbook from "./Guestbook";

const GuestbookPage = ({
  guestbookList,
  modifyGuestbook,
  deleteGuestbook,
  isAdmin,
  userId,
  changeInput
}) => {
  return (
    <div>
      {guestbookList.map(guestbook => (
        <Guestbook
          guestbook={guestbook}
          modifyGuestbook={modifyGuestbook}
          deleteGuestbook={deleteGuestbook}
          isAdmin={isAdmin}
          userId={userId}
          changeInput={changeInput}
        />
      ))}
    </div>
  );
};

export default GuestbookPage;
