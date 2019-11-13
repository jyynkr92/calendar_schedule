import firebase from "../firebase";

/** define action */
const SET_LOGIN_MODAL = "SET_LOGIN_MODAL";
const CLOSE_LOGIN_MODAL = "CLOSE_LOGIN_MODAL";

/** define action function */
export const setLoginModal = () => ({
  type: SET_LOGIN_MODAL
});

export const closeLoginModal = () => ({
  type: CLOSE_LOGIN_MODAL
});

export const signUpUser = (email, password) => {
  console.log(firebase.auth());
  return () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
};

/** define initial state */
const initialState = {
  loginModal: false
};

/** define reduce function */
function login(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_MODAL:
      return {
        ...state,
        loginModal: true
      };
    case CLOSE_LOGIN_MODAL:
      return {
        ...state,
        loginModal: false
      };
    default:
      return state;
  }
}

export default login;
