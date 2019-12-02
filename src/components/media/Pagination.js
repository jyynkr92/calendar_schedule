import React from "react";
import PageBtn from "./PageBtn";
import styled from "styled-components";

const Pagination = ({ moveOnePage, movePage, curPage }) => {
  return (
    <PaginationArea>
      <PageSpan
        onClick={() => {
          moveOnePage(-1);
        }}
      >
        &lt;
      </PageSpan>
      {Array.from(Array(10), (e, i) => {
        return <PageBtn curPage={curPage} movePage={movePage} value={i + 1} />;
      })}
      <PageSpan
        onClick={() => {
          moveOnePage(1);
        }}
      >
        &gt;
      </PageSpan>
    </PaginationArea>
  );
};

const PaginationArea = styled.div`
  text-align: center;
`;

const PageSpan = styled.div`
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

export default Pagination;
