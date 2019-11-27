import React from "react";
import styled from "styled-components";
import { getCleanValue, getDateFormatFromDate } from "../../lib/common";

const News = ({ news, idx }) => {
  return (
    <NewsCard url={news.link} idx={idx}>
      <NewsTitle>{getCleanValue(news.title)}</NewsTitle> {/** title 영역 */}
      <PubDate>{getDateFormatFromDate(news.pubDate)}</PubDate>
      <div>{getCleanValue(news.description)}</div>
      {/** description 영역 */}
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
