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
    contents: "",
    addUserName: "",
    addContents: ""
  };

  componentDidMount() {
    const { getGuestbook } = this.props;
    getGuestbook();
  }

  clearState = () => {
    this.setState({
      userName: "",
      contents: "",
      addUserName: "",
      addContents: ""
    });
  };

  changeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addGuestbook = () => {
    const { addGuestbook, userId } = this.props;
    const { addUserName, addContents } = this.state;
    const guestbook = { userName: addUserName, contents: addContents, userEmail: userId };

    addGuestbook(guestbook);

    this.setState({
      userName: "",
      contents: "",
      addUserName: "",
      addContents: ""
    });
  };

  modifyGuestbook = guestbookId => {
    const { modifyGuestbook, guestbookList } = this.props;
    const { userName, contents } = this.state;
    const { clearState } = this;

    const beforeGuestbook = guestbookList.filter(guestbook => {
      return guestbook.guestbookId === guestbookId;
    })[0];

    const userEmail = beforeGuestbook.userEmail;

    if (contents === "" || userName === "") {
      if (contents === "") {
        const beforeContents = beforeGuestbook.contents;
        const guestbook = {
          userName,
          contents: beforeContents,
          guestbookId,
          userEmail
        };
        modifyGuestbook(guestbook);
      } else if (userName === "") {
        const beforeUserName = beforeGuestbook.userName;
        const guestbook = {
          userName: beforeUserName,
          contents,
          guestbookId,
          userEmail
        };
        modifyGuestbook(guestbook);
      } else {
        const beforeContents = beforeGuestbook.contents;
        const beforeUserName = beforeGuestbook.userName;
        const guestbook = {
          userName: beforeUserName,
          contents: beforeContents,
          guestbookId,
          userEmail
        };
        modifyGuestbook(guestbook);
      }
    } else {
      const guestbook = { userName, contents, guestbookId, userEmail };
      modifyGuestbook(guestbook);
    }

    clearState();
  };

  deleteGuestbook = guestbookId => {
    const { deleteGuestbook } = this.props;
    deleteGuestbook(guestbookId);
  };

  render() {
    const { guestbookList, isAdmin, userId } = this.props;
    const { addGuestbook, modifyGuestbook, deleteGuestbook, changeInput } = this;
    const { addUserName, addContents } = this.state;
    return (
      <div className="guestbook_area">
        {userId !== "" ? (
          <GuestAddContents
            addGuestbook={addGuestbook}
            changeInput={changeInput}
            addUserName={addUserName}
            addContents={addContents}
          />
        ) : null}
        <GuestbookPage
          guestbookList={guestbookList}
          modifyGuestbook={modifyGuestbook}
          deleteGuestbook={deleteGuestbook}
          isAdmin={isAdmin}
          userId={userId}
          changeInput={changeInput}
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

export default connect(mapStateToProps, mapToDispatch)(GuestBookContainer);
