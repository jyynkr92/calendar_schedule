import { firestore, storageRef } from "../firebase";

/** define action */
const GET_TIMELINE = "GET_TIMELINE";
const ADD_TIMELINE = "ADD_TIMELINE";
const MODIFY_TIMELINE = "MODIFY_TIMELINE";
const DELETE_TIMELINE = "DELETE_TIMELINE";

/** modal area */
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

/** define action function */
export const getTimeline = timelineList => ({
  type: GET_TIMELINE,
  timelineList
});

export const addTimeline = timeline => ({
  type: ADD_TIMELINE,
  timeline
});

export const modfyTimeline = timeline => ({
  type: MODIFY_TIMELINE,
  timeline
});

export const deleteTimeline = timelineId => ({
  type: DELETE_TIMELINE,
  timelineId
});

export const openModal = () => ({
  type: OPEN_MODAL
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const getTimelineList = () => {
  return dispatch => {
    return firestore
      .collection("timeline")
      .orderBy("year")
      .orderBy("month")
      .orderBy("date")
      .onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(change => {
          const childData = change.doc.data();

          if (change.type === "added") {
            dispatch(addTimeline(childData));
          } else if (change.type === "removed") {
            dispatch(deleteTimeline(childData.timelineId));
          } else if (change.type === "modified") {
            dispatch(modfyTimeline(childData));
          }
        });
      });
  };
};

export const addTimelineToFirebase = timeline => {
  return () => {
    //image upload
    const { image } = timeline;
    // Create the file metadata
    const metadata = {
      contentType: "image/jpeg"
    };
    const uploadTask = storageRef.child(`images/${image.name}`).put(image, metadata);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(progress);
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          timeline.image = url;
          const doc = firestore.collection("timeline");
          const docId = doc.doc().id;
          timeline.timelineId = docId;
          return doc.add(timeline);
        });
      }
    );
  };
};

export const deleteTimlineToFirebase = timelineId => {
  return async () => {
    const doc = firestore.collection("timeline").where("timelineId", "==", timelineId);
    return doc.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
  };
};

export const modifyTimelineToFirebase = timeline => {
  return async () => {
    const doc = firestore.collection("timeline").where("timelineId", "==", timeline.timelineId);
    return doc.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.set(timeline);
      });
    });
  };
};

/** define initial state */
const initialState = {
  timelineList: [],
  isLoading: false,
  mode: "add",
  modal: false
};

/** define reduce function */
function timeline(state = initialState, action) {
  switch (action.type) {
    case GET_TIMELINE:
      return {
        ...state,
        timelineList: action.timelineList
      };
    case ADD_TIMELINE:
      return {
        ...state,
        timelineList: [].concat(
          state.timelineList.filter(val => val.timelineId !== action.timeline.timelineId),
          action.timeline
        )
      };
    case MODIFY_TIMELINE:
      const { content, type, year, month, date, image, title } = action.timeline;
      const modifyList = state.timelineList.map(timeline => {
        return timeline.timelineId === action.timeline.timelineId
          ? {
              ...timeline,
              content,
              type,
              year,
              month,
              date,
              image,
              title
            }
          : { ...timeline };
      });
      return {
        ...state,
        timelineList: modifyList
      };
    case DELETE_TIMELINE:
      return {
        ...state,
        timelineList: state.timelineList.filter(timeline => {
          return timeline.timelineId !== action.timelineId;
        })
      };
    case OPEN_MODAL:
      return {
        ...state,
        modal: true
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: false
      };
    default:
      return state;
  }
}

export default timeline;
