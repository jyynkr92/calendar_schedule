import React from "react";
import styled from "styled-components";
import { getCleanValue, getDateFormatFromDate } from "../../lib/common";

const News = ({ news, idx, openNews }) => {
  return (
    <NewsCard idx={idx} onClick={() => openNews(news.link)}>
      <NewsTitle>{getCleanValue(news.title)}</NewsTitle>
      <PubDate>{getDateFormatFromDate(news.pubDate)}</PubDate>
      <div>{getCleanValue(news.description)}</div>
    </NewsCard>
  );
};

const NewsCard = styled.div`
  border: 1px solid #d9d9d9;
  display: inline-table;
  width: 250px;
  height: 217px;
  margin: 10px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #fdf8ef;
  }
`;

const NewsTitle = styled.h6`
  height: 60px;
`;

const PubDate = styled.div`
  text-align: right;
  font-size: 8pt;
  margin-bottom: 8px;
`;
export default News;
