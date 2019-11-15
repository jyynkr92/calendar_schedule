import React from "react";
import Guestbook from "./Guestbook";

const GuestbookPage = ({ guestbookList, modifyGuestbook, deleteGuestbook, isAdmin, userId }) => {
  return (
    <div>
      {guestbookList.map(guestbook => (
        <Guestbook
          guestbook={guestbook}
          modifyGuestbook={modifyGuestbook}
          deleteGuestbook={deleteGuestbook}
          isAdmin={isAdmin}
          userId={userId}
        />
      ))}
    </div>
  );
};

export default GuestbookPage;
