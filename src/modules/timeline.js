import { firestore, storageRef } from "../firebase";

/** define action */
const GET_TIMELINE = "GET_TIMELINE";
const ADD_TIMELINE = "ADD_TIMELINE";
const MODIFY_TIMELINE = "MODIFY_TIMELINE";
const DELETE_TIMELINE = "DELETE_TIMELINE";

/** modal area */
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";
const SET_EDITMODE = "SET_EDITMODE";

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

export const setEditMode = timeline => ({
  type: SET_EDITMODE,
  timeline
});

export const getTimelineList = selectYear => {
  return async dispatch => {
    await firestore
      .collection("timeline")
      .where("year", "==", Number(selectYear))
      .orderBy("month")
      .orderBy("date")
      .get()
      .then(querySnapshot => {
        const timelineList = [];

        querySnapshot.docs.forEach(doc => {
          timelineList.push(doc.data());
        });

        dispatch(getTimeline(timelineList, selectYear));
      });
  };
};

export const addTimelineToFirebase = (timeline, selectYear) => {
  return dispatch => {
    //image upload
    const { image } = timeline;

    if (image === "") {
      const doc = firestore.collection("timeline");
      const docId = doc.doc().id;
      timeline.timelineId = docId;

      doc.add(timeline).then(() => {
        dispatch(getTimelineList(selectYear));
      });
      return;
    }

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
          timeline.imageName = image.name;
          const doc = firestore.collection("timeline");
          const docId = doc.doc().id;
          timeline.timelineId = docId;

          doc.add(timeline).then(() => {
            dispatch(getTimelineList(selectYear));
          });
        });
      }
    );
  };
};

export const deleteTimelineToFirebase = (timelineId, selectYear) => {
  return async dispatch => {
    const doc = firestore.collection("timeline").where("timelineId", "==", timelineId);
    return doc.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        const docData = doc.data();

        if (docData.image === "") {
          doc.ref.delete().then(() => {
            dispatch(getTimelineList(selectYear));
          });
        } else {
          const imageData = storageRef.child(`images/${docData.imageName}`);

          imageData.delete().then(() => {
            doc.ref.delete().then(() => {
              dispatch(getTimelineList(selectYear));
            });
          });
        }
      });
    });
  };
};

const uploadImage = (image, timeline) => {
  // Create the file metadata
  return new Promise((resolve, reject) => {
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
        reject(error);
        return;
      },
      async () => {
        const url = await uploadTask.snapshot.ref.getDownloadURL();
        timeline.image = url;
        timeline.imageName = image.name;
        resolve(timeline);
      }
    );
  });
};

const deleteImage = imageName => {
  const imageData = storageRef.child(`images/${imageName}`);
  imageData.delete();
};

export const modifyTimelineToFirebase = (timeline, selectYear) => {
  return dispatch => {
    const doc = firestore.collection("timeline").where("timelineId", "==", timeline.timelineId);
    doc.get().then(querySnapshot => {
      querySnapshot.forEach(async doc => {
        //image upload
        const { image } = timeline;
        const docData = doc.data();
        console.log(timeline);
        console.log(docData);

        console.log(docData.image);
        console.log(image);

        if (image === "") {
          doc.ref.set(timeline).then(() => {
            dispatch(getTimelineList(selectYear));
          });
        } else {
          if (docData.image !== "") {
            deleteImage(docData.imageName);
          }

          const newTimeline = await uploadImage(image, timeline);

          doc.ref.set(newTimeline).then(() => {
            dispatch(getTimelineList(selectYear));
          });
        }
      });
    });
  };
};

export const setEditModal = timelineId => {
  return async dispatch => {
    const doc = firestore.collection("timeline").where("timelineId", "==", timelineId);
    doc.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        const docData = doc.data();
        dispatch(setEditMode(docData));
      });
    });
  };
};
export const changeYear = year => {
  return dispatch => {
    dispatch(getTimelineList(year));
  };
};

/** define initial state */
const initialState = {
  timelineList: [],
  isLoading: false,
  mode: "add",
  modal: false,
  selectYear: 0,
  selectTimeline: {
    content: "",
    date: 0,
    image: "",
    month: 0,
    timelineId: "",
    title: "",
    type: "",
    year: 0
  }
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
        mode: "add",
        modal: false
      };
    case SET_EDITMODE:
      return {
        ...state,
        selectTimeline: action.timeline,
        mode: "edit",
        modal: true
      };
    default:
      return state;
  }
}

export default timeline;
