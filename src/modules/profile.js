import { firestore } from "../firebase";

/** define action */
const GET_MEMBERPROFILE = "GET_MEMBERPROFILE";

/** define action function */
export const getMemberProfile = (memberList, groupInfo) => ({
  type: GET_MEMBERPROFILE,
  memberList,
  groupInfo
});

export const getMemberProfileFromFiresotre = () => {
  return dispatch => {
    return firestore
      .collection("memberInfo")
      .get()
      .then(snapshot => {
        const memberList = [];
        let groupInfo = {};

        snapshot.forEach(doc => {
          console.log(doc.data().isGroup);
          if (doc.data().isGroup) {
            groupInfo = doc.data();
          } else {
            memberList.push(doc.data());
          }
        });

        dispatch(getMemberProfile(memberList, groupInfo));
      });
  };
};

/** define initial state */
const initialState = {
  groupInfo: {
    memberId: "",
    memberName: "",
    imageUrl: "",
    isGroup: true,
    memberBio: ""
  },
  memberList: [],
  isLoading: true
};

/** define reduce function */
function profile(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBERPROFILE:
      return {
        ...state,
        groupInfo: action.groupInfo,
        memberList: action.memberList,
        isLoading: false
      };
    default:
      return state;
  }
}

export default profile;
