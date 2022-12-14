import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGreaterThan,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Auth, Logout } from "../api/userApi";
import { GetBoardThumbnail } from "../api/articleApi";
import FeedThumbnail from "../components/FeedThumbnail";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-family: "Do Hyeon", sans-serif;
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
  color: #9bb7d6;
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

const LogoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  width: 300px;
  border: 1px solid #e6e8e7;
  border-radius: 10px;
  margin-top: 100px;
  margin-bottom: 50px;
  color: #777777;
`;

function Home() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [nickname, setNickname] = useState();

  const boardHandler = () => {
    navigate("/board");
  };
  const mapHandler = () => {
    navigate("/map");
  };

  const adminHandler = () => {
    navigate("/admin");
  };

  var deleteCookie = function (name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
  };

  const logoutHandler = () => {
    Logout().then((res) => {
      deleteCookie("x_auth");
      window.localStorage.removeItem("X-AUTH-TOKEN");
      alert("???????????? ???????????????.");
      navigate("/login");
    });
  };

  useEffect(() => {
    // Home ????????? ?????????????????? Admin?????? ????????? axios??? ?????? ??????.
    //  if(axios~~) ?????? isAdmin true -> setIsAdmin(true);
    let data = {
      "X-AUTH-TOKEN": window.localStorage.getItem("X-AUTH-TOKEN"),
    };
    Auth(data).then((res) => {
      setIsAdmin(res.isAdmin);
      setNickname(res.nickname);
      setIsAuth(res.isAuth);
      console.log(res);
      if (!res.isAuth) {
        alert("????????? ??? ??????????????????.");
        navigate("/login");
      }
    });

    GetBoardThumbnail().then((res) => {
      console.log(res);
      setArticles(res.data.board);
    });
  }, []);

  return (
    <Container>
      <SubHeaderContainer>
        <Profile
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1 }}
        >
          ??????????????? {nickname} ???{/* ??????????????? ?????? ?????? ?????? */}
        </Profile>
        {isAdmin ? (
          <AdminButton onClick={adminHandler}>????????? ?????????</AdminButton>
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
          <BoardName>?????????</BoardName>
          <MoreDetail onClick={boardHandler}>
            ?????????
            <FontAwesomeIcon icon={faGreaterThan} />
          </MoreDetail>
        </BoardTopContainer>
        <BoardBottomContainer>
          {articles
            .map((article, index) => {
              return (
                <FeedThumbnail
                  id={article._id}
                  title={article.title}
                  content={article.content}
                  date={article.createdAt.substring(0, 10)}
                  key={index}
                ></FeedThumbnail>
              );
            })
            .slice(0, 5)}
        </BoardBottomContainer>
      </BoardContainer>
      {isAuth ? (
        <LogoutContainer onClick={logoutHandler}>????????????</LogoutContainer>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default Home;
