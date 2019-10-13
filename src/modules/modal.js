/** define action */
const SET_MODAL = "SET_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

/** define action function */
export const setModal = modalDate => ({
  type: SET_MODAL,
  modalDate
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

/** define initial state */
const initialState = {
  modal: false,
  modalDate: ""
};

/** define reducer function */
function modal(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL:
      return {
        modal: true,
        modalDate: action.modalDate
      };
    case CLOSE_MODAL:
      return {
        modal: false
      };
    default:
      return state;
  }
}

export default modal;
