import React from "react";
import { ButtonToolbar, Button } from "react-bootstrap";
import "../App.css";

const ModeBtn = ({ mode, setMode }) => {
  return (
    <ButtonToolbar>
      <Button
        onClick={setMode}
        variant={mode === "mobile" ? "danger" : "outline-danger"}
        id="mobile"
      >
        모바일
      </Button>
      <Button onClick={setMode} variant={mode === "desktop" ? "info" : "outline-info"} id="desktop">
        데스크탑
      </Button>
    </ButtonToolbar>
  );
};

export default ModeBtn;
