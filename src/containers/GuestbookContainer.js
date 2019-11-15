import React, { PureComponent } from "react";
import { connect } from "react-redux";
import GuestbookPage from "../components/guestbook/GuestbookPage";
import GuestAddContents from "../components/guestbook/GuestAddContents";
import {
  getGuestbook,
  addGuestbookToFirebase,
  deleteGuestbookToFirebase,
  modifyGuestbookToFirebase
} from "../modules/guestbook";

class GuestBookContainer extends PureComponent {
  state = {
    userName: "",
    contents: ""
  };

  componentDidMount() {
    const { getGuestbook } = this.props;
    getGuestbook();
  }

  clearState = () => {
    this.setState({
      userName: "",
      contents: ""
    });
  };

  addGuestbook = () => {
    const { addGuestbookToFirebase } = this.props;
    const { userName, contents } = this.state;
    const { clearState } = this;
    const guestbook = { userName, contents };

    addGuestbookToFirebase(guestbook);
    clearState();
  };

  modifyGuestbook = guestbookId => {
    const { modifyGuestbookToFirebase } = this.props;
    const { userName, contents } = this.state;
    const { clearState } = this;

    const guestbook = { userName, contents, guestbookId };
    modifyGuestbookToFirebase(guestbook);
    clearState();
  };

  deleteGuestbook = guestbookId => {
    const { deleteGuestbookToFirebase } = this.props;
    deleteGuestbookToFirebase(guestbookId);
  };

  render() {
    const { guestbookList, isAdmin, userId } = this.props;
    const { addGuestbook, modifyGuestbook, deleteGuestbook } = this;
    return (
      <div>
        <GuestAddContents addGuestbook={addGuestbook} />
        <GuestbookPage
          guestbookList={guestbookList}
          modifyGuestbook={modifyGuestbook}
          deleteGuestbook={deleteGuestbook}
          isAdmin={isAdmin}
          userId={userId}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAdmin: state.login.isAdmin,
  userId: state.login.userId,
  guestbookList: state.guestbook.guestbookList
});

const mapToDispatch = dispatch => ({
  getGuestbook: () => {
    dispatch(getGuestbook());
  },
  addGuestbook: guestbook => {
    dispatch(addGuestbookToFirebase(guestbook));
  },
  modifyGuestbook: guestbook => {
    dispatch(modifyGuestbookToFirebase(guestbook));
  },
  deleteGuestbook: guestbookId => {
    dispatch(deleteGuestbookToFirebase(guestbookId));
  }
});

export default connect(
  mapStateToProps,
  mapToDispatch
)(GuestBookContainer);
