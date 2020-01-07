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
  modifyScheudle,
  isAdmin
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
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
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
              disabled={isAdmin ? false : true}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              onChange={changeValue}
              type="checkbox"
              label="하루 종일"
              name="allDayFlag"
              disabled={isAdmin ? false : true}
            />
          </Form.Group>
          {/* <Form.Group controlId="formBasicRadio"> 
            <Form.Check inline type="radio" label="예매" id="resevation" name="scheduleType" />
            <Form.Check inline type="radio" label="콘서트" id="concert" name="scheduleType" />
            <Form.Check inline type="radio" label="방송" id="tvshow" name="scheduleType" />
          </Form.Group> */}
          <div>시작일</div>
          <Form.Row>
            <Form.Group md="4" as={Col}>
              {isAdmin ? (
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
              ) : (
                <Form.Control type="text" value={startDate} disabled />
              )}
            </Form.Group>
            {allDayFlag ? null : (
              <>
                <Form.Group md="3" as={Col} controlId="startTime_ampm">
                  <Form.Control
                    as="select"
                    onChange={changeValue}
                    value={startAmPm}
                    name="startAmPm"
                    disabled={isAdmin ? false : true}
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
                    disabled={isAdmin ? false : true}
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
                    disabled={isAdmin ? false : true}
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
              {isAdmin ? (
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
              ) : (
                <Form.Control type="text" value={endDate} disabled />
              )}
            </Form.Group>
            {allDayFlag ? null : (
              <>
                <Form.Group md="3" as={Col} controlId="endTime_ampm">
                  <Form.Control
                    as="select"
                    onChange={changeValue}
                    value={endAmPm}
                    name="endAmPm"
                    disabled={isAdmin ? false : true}
                  >
                    <option value="am">오전</option>
                    <option value="pm">오후</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="endTime_hour">
                  <Form.Control
                    as="select"
                    onChange={changeValue}
                    value={endHour}
                    name="endHour"
                    disabled={isAdmin ? false : true}
                  >
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
                    disabled={isAdmin ? false : true}
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
            <Form.Control
              as="textarea"
              rows="3"
              onChange={changeValue}
              value={memo}
              name="memo"
              disabled={isAdmin ? false : true}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {mode === "add" && isAdmin ? <Button onClick={addSchedule}>입력</Button> : null}
        {mode === "show" && isAdmin ? <Button onClick={modifyScheudle}>수정</Button> : null}
        {isAdmin ? <Button onClick={deleteSchedule}>삭제</Button> : null}
        {!isAdmin ? <Button onClick={onHide}>닫기</Button> : null}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
