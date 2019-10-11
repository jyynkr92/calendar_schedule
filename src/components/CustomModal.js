import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const CustomModal = ({ modalDate, show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          일정 등록/수정
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" placeholder="제목을 입력하세요." />
          </Form.Group>
          <Form.Group>
            <Form.Label>시작일</Form.Label>
            <Form.Control type="text" placeholder={modalDate} />
          </Form.Group>
          <Form.Group>
            <Form.Label>종료일</Form.Label>
            <Form.Control type="text" placeholder={modalDate} />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="하루 종일" />
          </Form.Group>
          <Form.Group>
            <Form.Label>메모</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
