import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGreaterThan,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const SubHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin: 65px 0px 20px 0px;
`;

const Profile = styled(motion.div)`
  display: flex;
  text-align: center;
  /* margin-left: 20px; */
  font-weight: 700;
`;

const AdminButton = styled.div`
  display: flex;
  /* margin-right: 20px; */
  font-weight: 500;
  font-size: small;
`;

const MapContainer = styled.div`
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  border: 1px solid #e6e8e7;
  border-radius: 10px;
  width: 300px;
  height: 200px;
  margin: 0 20px;
  font-weight: 700px;
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/a/a6/Map_Seoul-teukbyeolsi.svg");
  background-size: 300px 200px;
`;

const MarkerContainer = styled(motion.div)`
  display: flex;
  width: 300px;
  justify-content: space-evenly;
  align-items: center;
  color: #6667ab;
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
  /* margin-left: 20px; */
`;

const MoreDetail = styled.div`
  font-size: small;
  font-weight: 600;
  /* margin-right: 20px; */
`;

const BoardBottomContainer = styled.div`
  margin-top: 20px;
  width: 300px;
  /* margin-left: 40px; */
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
  const [isAdmin, setIsAdmin] = useState(false);
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
  const mapHandler = () => {
    navigate("/map");
  };

  const adminHandler = () => {
    navigate("/admin");
  };

  useEffect(() => {
    // Home 페이지 들어오자마자 Admin인지 아닌지 axios를 통해 확인.
    //  if(axios~~) 해서 isAdmin true -> setIsAdmin(true);
    setIsAdmin(true);
  }, []);

  return (
    <Container>
      <SubHeaderContainer>
        <Profile
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1 }}
        >
          안녕하세요 호강 님.
          {/* 닉네임으로 호강 자리 변경 */}
        </Profile>
        {isAdmin ? (
          <AdminButton onClick={adminHandler}>관리자 페이지</AdminButton>
        ) : (
          <></>
        )}
      </SubHeaderContainer>
      <MapContainer onClick={mapHandler}>
        <MarkerContainer
          animate={{
            y: ["0rem", "-1rem"],
          }}
          transition={{
            yoyo: Infinity,
            duration: 0.8,
            ease: "easeOut",
            delay: 1,
          }}
        >
          <FontAwesomeIcon icon={faLocationDot} size="2x" style={{}} />
          <FontAwesomeIcon icon={faLocationDot} size="2x" />
        </MarkerContainer>
      </MapContainer>
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
