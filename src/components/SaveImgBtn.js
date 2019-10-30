import React from "react";
import { ButtonToolbar, Button } from "react-bootstrap";

const SaveImgBtn = ({ saveImage }) => {
  return (
    <ButtonToolbar>
      <Button variant="success" onClick={saveImage}>
        이미지저장
      </Button>
    </ButtonToolbar>
  );
};

export default SaveImgBtn;
