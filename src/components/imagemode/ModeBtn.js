import React from "react";
import { ButtonToolbar, Button } from "react-bootstrap";
import "../../App.css";

const ModeBtn = ({ mode, setMode }) => {
  return (
    <ButtonToolbar>
      <Button
        onClick={setMode}
        variant={mode === "mobile" ? "danger" : "outline-danger"}
        id="mobile"
        size="sm"
      >
        작은 이미지
      </Button>
      <Button
        onClick={setMode}
        variant={mode === "desktop" ? "info" : "outline-info"}
        id="desktop"
        size="sm"
      >
        큰 이미지
      </Button>
    </ButtonToolbar>
  );
};

export default ModeBtn;
