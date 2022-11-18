import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const Profile = styled.div`
  margin: 65px 0 20px 0;
  display: flex;
  text-align: center;
  width: 300px;
  justify-content: flex-start;
  font-weight: 700;
`;

const MapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e6e8e7;
  border-radius: 10px;
  width: 300px;
  height: 200px;
  font-weight: 700px;
`;

const BoardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 300px;
  margin-top: 30px;
`;

const BoardTopContainer = styled.div`
  height: 30px;
  display: flex;
  width: 300px;
  justify-content: space-between;
  align-items: center;
`;

const BoardName = styled.div`
  font-weight: 900;
  text-decoration: underline;
  text-decoration-thickness: 3px;
`;

const MoreDetail = styled.div`
  font-size: small;
  font-weight: 600;
`;

const BoardBottomContainer = styled.div`
  margin-top: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Article = styled.div`
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 10px 0;
`;

const Articletitle = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: small;
`;

const ArticleDate = styled.div`
  color: #e6e8e7;
  display: flex;
  justify-content: flex-start;
  font-size: x-small;
`;

function Home() {
  const navigate = useNavigate();
  // const [articles, setArticles] = useState([]);
  const articles = [
    {
      title: "테스트1",
      date: "2022-11-18",
    },
    {
      title: "테스트2",
      date: "2022-11-18",
    },
    {
      title: "테스트3",
      date: "2022-11-18",
    },
    {
      title: "테스트4",
      date: "2022-11-18",
    },
  ];
  const boardHandler = () => {
    navigate("/board");
  };

  return (
    <Container>
      <Profile>안녕하세요 호강 님.</Profile>
      <MapContainer>지도 들어갈 공간</MapContainer>
      <BoardContainer>
        <BoardTopContainer>
          <BoardName>게시판</BoardName>
          <MoreDetail onClick={boardHandler}>
            더보기
            <FontAwesomeIcon icon={faGreaterThan} />
          </MoreDetail>
        </BoardTopContainer>
        <BoardBottomContainer>
          {articles.map((article, index) => (
            <Article key={index}>
              <Articletitle>{article.title}</Articletitle>
              <ArticleDate>{article.date}</ArticleDate>
            </Article>
          ))}
        </BoardBottomContainer>
      </BoardContainer>
    </Container>
  );
}

export default Home;
