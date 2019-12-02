import React from "react";
import styled from "styled-components";

const PageBtn = ({ curPage, movePage, value }) => {
  return (
    <PageSpan
      curPage={curPage}
      value={value}
      onClick={() => {
        movePage(value);
      }}
    >
      {value}
    </PageSpan>
  );
};

const PageSpan = styled.div`
  background-color: ${props => (props.curPage === props.value ? `#d9b99b` : `#fffaf0`)};
  display: inline-block;
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 36px;
  margin: 0px 5px;
  cursor: pointer;
`;

export default PageBtn;
