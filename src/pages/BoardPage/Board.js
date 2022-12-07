/* eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
// import axios from "axios";
import Loader from "../../components/Loader";
import SearchBar from "../../components/SearchBar";
import { GetBoardThumbnail } from "../../api/articleApi";
import FeedThumbnail from "../../components/FeedThumbnail";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const Search = styled.div`
  margin-top: 65px;
  width: 300px;
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

const WriteButton = styled.button`
  background-color: #9bb7d6;
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
  position: fixed;
  font-weight: 700;
  left: 50%;
  transform: translate(-50%, 800%);
`;

function Board(props) {
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [articles, setArticles] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    GetBoardThumbnail().then((res) => {
      console.log(res);
      setArticles(res.data.board);
    });
  }, []);

  // useEffect(() => {
  //   searched = articles.filter((article) => {
  //     article.title.includes(keyword);
  //   });
  //   console.log(searched);
  // }, [keyword]);

  const writeHandler = () => {
    navigate("/write", { state: { isEdit: false } });
  };

  // console.log(searched);

  const searched = articles.filter(
    (article) =>
      article.title.includes(keyword) || article.contents.includes(keyword)
  );

  return (
    <Container>
      <Search>
        <SearchBar setKeyword={setKeyword} />
      </Search>
      <NoticeContainer>
        <Notice>공지사항</Notice>
        {/* {notices.map((notice, index) => (
          <Article key={index}>
            <NoticeWrite>공지글</NoticeWrite>
            <Articletitle>{notice.title}</Articletitle>
            <ArticleDate>{notice.date}</ArticleDate>
          </Article>
        ))} */}
      </NoticeContainer>
      <ArticleContainer>
        {searched &&
          searched.map((article, index) => {
            return (
              <FeedThumbnail
                id={article._id}
                title={article.title}
                content={article.content}
                date={article.createdAt.substring(0, 10)}
                key={index}
                {...article}
              />
            );
          })}
      </ArticleContainer>
      {/* <Loader /> */}
      <WriteButton onClick={writeHandler}>글쓰기</WriteButton>
    </Container>
  );
}

export default Board;
