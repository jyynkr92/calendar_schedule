import { firestore } from "../firebase";

/** define action */
const SET_MODE = "SET_MODE";
const SET_IMAGE = "SET_IMAGE";
const SET_IMAGE_LIST = "SET_IMAGE_LIST";
const SET_LOAD = "SET_LOAD";

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

export const setLoad = isLoading => ({
  type: SET_LOAD,
  isLoading
});

export const getImageListFromFirebase = mode => {
  return dispatch => {
    dispatch(setLoad(true));
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
  isLoading: true,
  mode: "mobile",
  selectImage: {
    backgroundColor: "#302f2c",
    weekNameColor: "#52544f",
    topColor: "#d9d9d9",
    imageUrl: "../backgroundImg/background3.png",
    fontColor: "#eff0dc"
  },
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
        imageList: action.imageList,
        isLoading: false
      };
    case SET_LOAD:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
}

export default imagemode;
