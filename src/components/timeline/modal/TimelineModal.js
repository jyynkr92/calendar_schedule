import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "moment/locale/ko";
import MomentLocaleUtils from "react-day-picker/moment";

const TimelineModal = ({
  show,
  onHide,
  content,
  type,
  year,
  month,
  date,
  imageUrl,
  title,
  changeInput,
  addTimeline,
  imageObj
}) => {
  const fullDate = year + "-" + month + "-" + date;
  const changeValue = e => {
    const targetName = e.target.name;

    if (targetName === "image") {
      if (e.target.files[0]) {
        const image = e.target.files[0];
        changeInput(targetName, image);
      }
    } else {
      const targetValue = e.target.value;
      changeInput(targetName, targetValue);
    }
  };

  const changeDateValue = (day, targetName) => {
    const date = new Date(day);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dayNum = date.getDate();

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
        <Modal.Title id="contained-modal-title-vcenter">타임라인 등록/수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              placeholder="제목을 입력하세요"
              name="title"
              value={title}
              onChange={changeValue}
            />
          </Form.Group>
          <Form.Group>
            <div>
              <Form.Label>구분</Form.Label>
            </div>
            <Form.Check
              inline
              label="콘서트"
              value="C"
              name="type"
              type="radio"
              checked={type === "C" ? true : false}
              onChange={changeValue}
            />
            <Form.Check
              inline
              label="방송"
              value="T"
              name="type"
              checked={type === "T" ? true : false}
              type="radio"
              onChange={changeValue}
            />
            <Form.Check
              inline
              label="라디오"
              value="R"
              name="type"
              checked={type === "R" ? true : false}
              type="radio"
              onChange={changeValue}
            />
            <Form.Check
              inline
              label="기타"
              value="E"
              name="type"
              checked={type === "E" ? true : false}
              type="radio"
              onChange={changeValue}
            />
          </Form.Group>
          <Form.Group>
            <div>
              <Form.Label>날짜</Form.Label>
            </div>
            <DayPickerInput
              id="date"
              dayPickerProps={{
                locale: "ko",
                localeUtils: MomentLocaleUtils
              }}
              value={fullDate}
              name="date"
              onDayChange={day => changeDateValue(day, "date")}
            ></DayPickerInput>
          </Form.Group>
          <Form.Group>
            <div>
              <Form.Label>이미지 등록</Form.Label>
            </div>
            <div className="image_preview">
              {imageUrl !== "" ? (
                <img src={imageUrl} alt="timeline_image" />
              ) : (
                <div>이미지표시되는 부분</div>
              )}
            </div>
            <div>
              <span>File</span>
              <input type="file" name="image" onChange={changeValue} />
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>내용</Form.Label>
            <Form.Control
              id="contents_area"
              as="textarea"
              rows="3"
              name="content"
              value={content}
              onChange={changeValue}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addTimeline}>등록</Button>
        <Button onClick={onHide}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TimelineModal;
