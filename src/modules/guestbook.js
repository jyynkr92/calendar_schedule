import firestore from "../firebase";

/** define action */
const ADD_GUESTBOOK = "ADD_GUESTBOOK";
const MODIFY_GUESTBOOK = "MODIFY_GUESTBOOK";
const DELETE_GUESTBOOK = "DELETE_GUESTBOOK";

/** define action function */
export const addGuestbook = guestbook => ({
  type: ADD_GUESTBOOK,
  guestbook
});

export const modifyGuestbook = guestbook => ({
  type: MODIFY_GUESTBOOK,
  guestbook
});

export const deleteGuestbook = guestbookId => ({
  type: DELETE_GUESTBOOK,
  guestbookId
});

export const getGuestbook = () => {
  return dispatch => {
    return firestore.collection("guestbook").onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(change => {
        const childData = change.doc.data();

        if (change.type === "added") {
          dispatch(addGuestbook(childData));
        } else if (change.type === "removed") {
          dispatch(deleteGuestbook(childData.guestbookId));
        } else if (change.type === "modified") {
          dispatch(modifyGuestbook(childData));
        }
      });
    });
  };
};

export const addGuestbookToFirebase = guestbook => {
  return () => {
    const doc = firestore.collection("guestbook");
    const docId = doc.doc().id;
    guestbook.guestbookId = docId;
    return doc.add(guestbook);
  };
};

export const deleteGuestbookToFirebase = guestbookId => {
  return () => {
    const doc = firestore.collection("guestbook").where("guestbookId", "==", guestbookId);
    return doc.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
  };
};

export const modifyGuestbookToFirebase = guestbook => {
  return () => {
    const doc = firestore.collection("guestbook").where("guestbookId", "==", guestbook.guestbookId);
    return doc.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.set(guestbook);
      });
    });
  };
};

/** define initial state */
const initialState = {
  guestbookList: []
};

/** define reduce function */
function guestbook(state = initialState, action) {
  switch (action.type) {
    case ADD_GUESTBOOK:
      return {
        ...state,
        guestbookList: [].concat(
          state.guestbookList.filter(val => val.guestbookId !== action.guestbook.guestbookId),
          action.guestbook
        )
      };
    case MODIFY_GUESTBOOK:
      const { userName, guestbookId, contents } = action.guestbook;
      const modifyList = state.guestbookList.map(guestbook => {
        return guestbook.guestbookId === guestbookId
          ? {
              ...guestbook,
              userName,
              contents
            }
          : { ...guestbook };
      });
      return {
        ...state,
        guestbookList: modifyList
      };
    case DELETE_GUESTBOOK:
      return {
        ...state,
        guestbookList: state.guestbookList.filter(guestbook => {
          return guestbook.guestbookId !== action.guestbookId;
        })
      };
    default:
      return state;
  }
}

export default guestbook;
