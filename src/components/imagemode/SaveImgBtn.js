import React from "react";
import { ButtonToolbar, Button } from "react-bootstrap";

const SaveImgBtn = ({ setSaveImage }) => {
  return (
    <ButtonToolbar>
      <Button variant="success" onClick={setSaveImage} size="sm">
        이미지저장
      </Button>
    </ButtonToolbar>
  );
};

export default SaveImgBtn;
