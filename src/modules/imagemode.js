import firestore from "../firebase";

/** define action */
const SET_MODE = "SET_MODE";
const SET_IMAGE = "SET_IMAGE";
const SET_IMAGE_LIST = "SET_IMAGE_LIST";

/** define action function */
export const setMode = mode => ({
  type: SET_MODE,
  mode
});

export const setImage = imageId => ({
  type: SET_IMAGE,
  imageId
});

export const setMobileImageList = (imageList, mode) => ({
  type: SET_IMAGE_LIST,
  imageList,
  mode
});

export const setDesktopImageList = (imageList, mode) => ({
  type: SET_IMAGE_LIST,
  imageList,
  mode
});

export const getImageListFromFirebase = mode => {
  return dispatch => {
    firestore
      .collection(mode + "Image")
      .get()
      .then(function(querySnapshot) {
        const imageList = [];
        querySnapshot.forEach(function(doc) {
          imageList.push(doc.data());
        });

        if (mode === "mobile") {
          dispatch(setMobileImageList(imageList, mode));
        } else {
          dispatch(setDesktopImageList(imageList, mode));
        }
      });
  };
};

/** define initial state */
const initialState = {
  mode: "mobile",
  selectImage: "../backgroundImg/background2.png",
  imageList: [
    "../backgroundImg/background2.png",
    "../backgroundImg/background3.jpg",
    "../backgroundImg/background4.jpg",
    "../backgroundImg/background5.jpg"
  ]
};

/** define reduce function */
function imagemode(state = initialState, action) {
  switch (action.type) {
    case SET_MODE:
      return {
        ...state,
        mode: action.mode,
        selectImage: action.mode === "mobile" ? state.mobileImageList[0] : state.desktopImageList[0]
      };
    case SET_IMAGE:
      return {
        ...state,
        selectImage: state.imageList.filter(image => {
          return image.imageId === action.imageId;
        })[0]
      };
    case SET_IMAGE_LIST:
      return {
        ...state,
        mode: action.mode,
        selectImage: action.imageList[0],
        imageList: action.imageList
      };
    default:
      return state;
  }
}

export default imagemode;
