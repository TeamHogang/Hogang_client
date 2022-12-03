import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Article = styled.div`
  width: 300px;
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 10px 0;
`;

const ArticleNickname = styled.div`
  color: #a9a9a9;
  display: flex;
  justify-content: flex-start;
  font-size: small;
  margin-bottom: 5px;
`;

const Articletitle = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: medium;
  margin-bottom: 5px;
`;

const ArticleDate = styled.div`
  color: #e6e8e7;
  display: flex;
  justify-content: flex-start;
  font-size: x-small;
`;

function FeedThumbnail({ id, title, content, date }) {
  const navigate = useNavigate();
  const onFeedClick = () => {
    navigate(`/feed/${id}`);
  };
  return (
    <Article onClick={onFeedClick}>
      <Articletitle>{title}</Articletitle>
      <ArticleNickname>{content}</ArticleNickname>
      <ArticleDate>{date}</ArticleDate>
    </Article>
  );
}

export default FeedThumbnail;
