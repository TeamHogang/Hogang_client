import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const SearchBar = styled.div`
  margin: 65px 0 20px 0;
`;

const NoticeContainer = styled.div`
  margin-top: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Notice = styled.div`
  font-weight: 700;
  color: #800020;
  font-size: large;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
`;
const NoticeWrite = styled.div`
  color: #800020;
  font-size: small;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 5px;
`;

const ArticleContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

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

const WriteButton = styled.button`
  position: fixed;
  top: 700px;
  background-color: #a6a6a6;
  color: #ffffff;
  width: 130px;
  height: 40px;
  font-size: 1rem;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  border-radius: 20px;
  font-weight: 700;
  z-index: 999;
`;

function Board() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);

  const [ref, inView] = useInView();

  const getArticles = useCallback(async () => {
    setLoad(true);
    // await axios.get().then((res) => {
    //   setArticles((prevState) => [...prevState, res]);
    // });
    setLoad(false);
  }, [page]);

  useEffect(() => {
    //getArticles 가 바뀔때마다 함수 실행
    getArticles();
  }, [getArticles]);

  useEffect(() => {
    // 마지막 게시물을 보고 있고, 로딩중이 아니라면
    if (inView && !load) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, load]);

  const notices = [
    {
      title: "테스트1",
      date: "2022-11-18",
    },
  ];

  const articles = [
    {
      nickname: "zz",
      title: "테스트1",
      date: "2022-11-18",
    },
    {
      nickname: "zz",
      title: "테스트2",
      date: "2022-11-18",
    },
    {
      nickname: "zz",
      title: "테스트3",
      date: "2022-11-18",
    },
    {
      nickname: "zz",
      title: "테스트4",
      date: "2022-11-18",
    },
    {
      nickname: "zz",
      title: "테스트1",
      date: "2022-11-18",
    },
    {
      nickname: "zz",
      title: "테스트2",
      date: "2022-11-18",
    },
    {
      nickname: "zz",
      title: "테스트3",
      date: "2022-11-18",
    },
    {
      nickname: "zz",
      title: "테스트4",
      date: "2022-11-18",
    },
  ];

  const writeHandler = () => {
    navigate("/new");
  };

  return (
    <Container>
      <SearchBar>검색창 들어갈 자리</SearchBar>
      <NoticeContainer>
        <Notice>공지사항</Notice>
        {notices.map((notice, index) => (
          <Article key={index}>
            <NoticeWrite>공지글</NoticeWrite>
            <Articletitle>{notice.title}</Articletitle>
            <ArticleDate>{notice.date}</ArticleDate>
          </Article>
        ))}
      </NoticeContainer>
      <ArticleContainer>
        {articles.map((article, index) => (
          <Article key={index}>
            {articles.length - 1 == index ? (
              <div ref={ref}>
                {/* 마지막 요소라면 ref를 추가하여 inView를 true로 변경시킴. */}
                <ArticleNickname>{article.nickname}</ArticleNickname>
                <Articletitle>{article.title}</Articletitle>
                <ArticleDate>{article.date}</ArticleDate>
              </div>
            ) : (
              <div>
                <ArticleNickname>{article.nickname}</ArticleNickname>
                <Articletitle>{article.title}</Articletitle>
                <ArticleDate>{article.date}</ArticleDate>
              </div>
            )}
          </Article>
        ))}
      </ArticleContainer>
      <WriteButton onClick={writeHandler}>글쓰기</WriteButton>
    </Container>
  );
}

export default Board;
