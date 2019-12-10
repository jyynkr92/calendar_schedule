import React from "react";
import { Modal, Form, Button, Col } from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "moment/locale/ko";
import MomentLocaleUtils from "react-day-picker/moment";

const TimelineModal = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">타임라인 등록/수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" placeholder="제목을 입력하세요" name="title" />
          </Form.Group>
          <Form.Group>
            <Form.Label>구분</Form.Label>
            <Form.Check inline label="콘서트" type="radio" />
            <Form.Check inline label="방송" type="radio" />
            <Form.Check inline label="라디오" type="radio" />
            <Form.Check inline label="기타" type="radio" />
          </Form.Group>
          <Form.Group>
            <Form.Label>날짜</Form.Label>
            <DayPickerInput
              id="date"
              dayPickerProps={{
                locale: "ko",
                localeUtils: MomentLocaleUtils
              }}
            ></DayPickerInput>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TimelineModal;
