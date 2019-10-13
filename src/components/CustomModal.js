import React from "react";
import { Modal, Form, Button, Col } from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "moment/locale/ko";
import MomentLocaleUtils from "react-day-picker/moment";

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
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="하루 종일" />
          </Form.Group>
          <div>시작일</div>
          <Form.Row>
            <Form.Group md="4" as={Col}>
              <div className="datepicker_div">
                <DayPickerInput
                  id="startDate"
                  value={modalDate}
                  placeholder={modalDate}
                  dayPickerProps={{
                    locale: "ko",
                    localeUtils: MomentLocaleUtils
                  }}
                />
              </div>
            </Form.Group>
            <Form.Group md="1" as={Col}>
              &nbsp;
            </Form.Group>
            <Form.Group md="2" as={Col} controlId="startTime_ampm">
              <Form.Control as="select">
                <option>오전</option>
                <option>오후</option>
              </Form.Control>
            </Form.Group>
            <Form.Group md="2" as={Col} controlId="startTime_hour">
              <Form.Control as="select">
                {[...Array(12)].map((x, i) => (
                  <option> {i + 1 < 10 ? "0" + (i + 1) : i + 1} </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group md="1" as={Col} id="startTime_separator">
              :
            </Form.Group>
            <Form.Group md="2" as={Col} controlId="startTime_minute">
              <Form.Control as="select">
                {[...Array(12)].map((x, i) => (
                  <option> {i * 5 < 10 ? "0" + i * 5 : i * 5} </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <div>종료일</div>
          <Form.Row>
            <Form.Group md="4" as={Col}>
              <div className="datepicker_div">
                <DayPickerInput
                  id="endDate"
                  value={modalDate}
                  placeholder={modalDate}
                  dayPickerProps={{
                    locale: "ko",
                    localeUtils: MomentLocaleUtils
                  }}
                />
              </div>
            </Form.Group>
            <Form.Group md="1" as={Col}>
              &nbsp;
            </Form.Group>
            <Form.Group md="2" as={Col} controlId="endTime_ampm">
              <Form.Control as="select">
                <option>오전</option>
                <option>오후</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="endTime_hour">
              <Form.Control as="select">
                {[...Array(12)].map((x, i) => (
                  <option> {i + 1 < 10 ? "0" + (i + 1) : i + 1} </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group md="1" as={Col} id="endTime_separator">
              :
            </Form.Group>
            <Form.Group md="2" as={Col} controlId="endTime_minute">
              <Form.Control as="select">
                {[...Array(12)].map((x, i) => (
                  <option> {i * 5 < 10 ? "0" + i * 5 : i * 5} </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>메모</Form.Label>
            <Form.Control as="textarea" rows="3" controlId="memo_area" />
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
