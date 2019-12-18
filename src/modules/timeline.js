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
export const getTimeline = (timelineList, selectYear) => ({
  type: GET_TIMELINE,
  timelineList,
  selectYear
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

export const getTimelineList = year => {
  return async dispatch => {
    const timelineList = [];
    await firestore
      .collection("timeline")
      .where("year", "==", year)
      .orderBy("month")
      .orderBy("date")
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          timelineList.push(doc.data());
        });
      });
    dispatch(getTimeline(timelineList, year));
  };
};

export const addTimelineToFirebase = (timeline, selectYear) => {
  return dispatch => {
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
          doc.add(timeline).then(() => {
            console.log(selectYear);
            dispatch(getTimelineList(selectYear));
          });
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
  modal: false,
  selectYear: 0
};

/** define reduce function */
function timeline(state = initialState, action) {
  switch (action.type) {
    case GET_TIMELINE:
      return {
        ...state,
        timelineList: action.timelineList,
        selectYear: action.selectYear
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
