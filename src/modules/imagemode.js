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
  selectImage: "",
  mobileImageList: ["./img/calendar_background.jpg"],
  desktopImageList: ["./img/calendar_background.jpg"]
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
