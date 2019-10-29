import React from "react";
import { Modal, Form, Button, Col } from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "moment/locale/ko";
import MomentLocaleUtils from "react-day-picker/moment";

const CustomModal = ({
  startDate,
  endDate,
  show,
  onHide,
  changeInput,
  addSchedule,
  title,
  startAmPm,
  startHour,
  startMinute,
  endAmPm,
  endHour,
  endMinute,
  allDayFlag,
  memo,
  deleteSchedule,
  mode,
  modifyScheudle
}) => {
  const changeValue = e => {
    const targetName = e.target.name;

    if (targetName === "allDayFlag") {
      const targetValue = e.target.checked;
      changeInput(targetName, targetValue);
    } else {
      const targetValue = e.target.value;
      changeInput(targetName, targetValue);
    }
  };

  const changeDateValue = (day, targetName) => {
    const date = new Date(day);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const dayNum = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    changeInput(targetName, year + "-" + month + "-" + dayNum);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">일정 등록/수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              placeholder="제목을 입력하세요."
              onChange={changeValue}
              value={title}
              name="title"
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              onChange={changeValue}
              type="checkbox"
              label="하루 종일"
              name="allDayFlag"
            />
          </Form.Group>
          <div>시작일</div>
          <Form.Row>
            <Form.Group md="4" as={Col}>
              <div className="datepicker_div">
                <DayPickerInput
                  id="startDate"
                  value={startDate}
                  dayPickerProps={{
                    locale: "ko",
                    localeUtils: MomentLocaleUtils
                  }}
                  onDayChange={day => changeDateValue(day, "startDate")}
                />
              </div>
            </Form.Group>
            {allDayFlag ? null : (
              <>
                <Form.Group md="3" as={Col} controlId="startTime_ampm">
                  <Form.Control
                    as="select"
                    onChange={changeValue}
                    value={startAmPm}
                    name="startAmPm"
                  >
                    <option value="am">오전</option>
                    <option value="pm">오후</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group md="2" as={Col} controlId="startTime_hour">
                  <Form.Control
                    as="select"
                    onChange={changeValue}
                    value={startHour}
                    name="startHour"
                  >
                    {[...Array(12)].map((x, i) => (
                      <option> {i + 1 < 10 ? "0" + (i + 1) : i + 1} </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group md="1" as={Col} id="startTime_separator">
                  :
                </Form.Group>
                <Form.Group md="2" as={Col} controlId="startTime_minute">
                  <Form.Control
                    as="select"
                    onChange={changeValue}
                    name="startMinute"
                    value={startMinute}
                  >
                    {[...Array(12)].map((x, i) => (
                      <option> {i * 5 < 10 ? "0" + i * 5 : i * 5} </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </>
            )}
          </Form.Row>
          <div>종료일</div>
          <Form.Row>
            <Form.Group md="4" as={Col}>
              <div className="datepicker_div">
                <DayPickerInput
                  id="endDate"
                  value={endDate}
                  dayPickerProps={{
                    locale: "ko",
                    localeUtils: MomentLocaleUtils
                  }}
                  onDayChange={day => changeDateValue(day, "endDate")}
                />
              </div>
            </Form.Group>
            {allDayFlag ? null : (
              <>
                <Form.Group md="3" as={Col} controlId="endTime_ampm">
                  <Form.Control as="select" onChange={changeValue} value={endAmPm} name="endAmPm">
                    <option value="am">오전</option>
                    <option value="pm">오후</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="endTime_hour">
                  <Form.Control as="select" onChange={changeValue} value={endHour} name="endHour">
                    {[...Array(12)].map((x, i) => (
                      <option> {i + 1 < 10 ? "0" + (i + 1) : i + 1} </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group md="1" as={Col} id="endTime_separator">
                  :
                </Form.Group>
                <Form.Group md="2" as={Col} controlId="endTime_minute">
                  <Form.Control
                    as="select"
                    onChange={changeValue}
                    value={endMinute}
                    name="endMinute"
                  >
                    {[...Array(12)].map((x, i) => (
                      <option> {i * 5 < 10 ? "0" + i * 5 : i * 5} </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </>
            )}
          </Form.Row>
          <Form.Group>
            <Form.Label>메모</Form.Label>
            <Form.Control as="textarea" rows="3" onChange={changeValue} value={memo} name="memo" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {mode === "add" ? <Button onClick={addSchedule}>입력</Button> : null}
        {mode === "show" ? <Button onClick={modifyScheudle}>수정</Button> : null}
        <Button onClick={deleteSchedule}>삭제</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
