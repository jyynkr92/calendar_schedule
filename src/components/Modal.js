import React from "react";

const Modal = ({ modalDate, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="title_div">
          일정 등록/수정
          <span className="close" onClick={closeModal}>
            &times;
          </span>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <input type="radio" />
                All day
              </td>
            </tr>
            <tr>
              <th>Start Date</th>
              <td>
                <input type="text" value={modalDate} />
              </td>
            </tr>
            <tr>
              <th>End Date</th>
              <td>
                <input type="text" value={modalDate} />
              </td>
            </tr>
            <tr>
              <th>Location</th>
              <td>
                <input type="text" value={modalDate} />
              </td>
            </tr>
            <tr>
              <th>Memo</th>
              <td>
                <textarea placeholder="memo" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Modal;
