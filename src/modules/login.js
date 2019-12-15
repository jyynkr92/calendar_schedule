import { firebase } from "firebase";

/** define action */
const SET_LOGIN_MODAL = "SET_LOGIN_MODAL";
const CLOSE_LOGIN_MODAL = "CLOSE_LOGIN_MODAL";
const USER_SIGN_OUT = "USER_SIGN_OUT";
const USER_SIGN_IN = "USER_SIGN_IN";

/** define action function */
export const setLoginModal = () => ({
  type: SET_LOGIN_MODAL
});

export const closeLoginModal = () => ({
  type: CLOSE_LOGIN_MODAL
});

export const userSignIn = (isAdmin, userId) => ({
  type: USER_SIGN_IN,
  isAdmin,
  userId
});

export const userSignOut = () => ({
  type: USER_SIGN_OUT
});

export const signUpUser = (email, password) => {
  return dispatch => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(closeLoginModal());
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        //var errorMessage = error.message;

        if (errorCode.indexOf("email-already-in-use") > -1) {
          alert("이미 사용중인 메일 계정입니다.");
        }
      });
  };
};

export const getUserSession = email => {
  return dispatch => {
    if (email === "jyynkr92@gmail.com") {
      dispatch(userSignIn(true, email));
    } else {
      dispatch(userSignIn(false, email));
    }
  };
};

export const signInUser = (email, password) => {
  return dispatch => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            if (email === "jyynkr92@gmail.com") {
              console.log(email);
              dispatch(userSignIn(true, email));
            } else {
              dispatch(userSignIn(false, email));
            }
          })
          .catch(error => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
          });
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
};

export const signOutUser = () => {
  return dispatch => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        dispatch(userSignOut());
      })
      .catch(function(error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
};

/** define initial state */
const initialState = {
  loginModal: false,
  signInStatus: false,
  userId: "",
  isAdmin: false
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
    case USER_SIGN_IN:
      return {
        ...state,
        signInStatus: true,
        isAdmin: action.isAdmin,
        userId: action.userId
      };
    case USER_SIGN_OUT:
      return {
        ...state,
        signInStatus: false,
        isAdmin: false,
        userId: ""
      };
    default:
      return state;
  }
}

export default login;
