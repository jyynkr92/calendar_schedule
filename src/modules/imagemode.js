/** define action */
const SET_MODE = "SET_MODE";
const SET_IMAGE = "SET_IMAGE";

/** define action function */
export const setMode = mode => ({
  type: SET_MODE,
  mode
});

export const setImage = imageUrl => ({
  type: SET_IMAGE,
  imageUrl
});

/** define initial state */
const initialState = {
  mode: "mobile",
  selectImage: "../backgroundImg/background2.png",
  mobileImageList: [
    "../backgroundImg/background2.png",
    "../backgroundImg/background3.jpg",
    "../backgroundImg/background4.jpg",
    "../backgroundImg/background5.jpg"
  ],
  desktopImageList: [
    "../backgroundImg/background.jpg",
    "../backgroundImg/background6.jpg",
    "../backgroundImg/background7.jpg",
    "../backgroundImg/background8.jpg"
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
        selectImage: action.imageUrl
      };
    default:
      return state;
  }
}

export default imagemode;
