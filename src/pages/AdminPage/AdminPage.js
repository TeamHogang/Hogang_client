import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const SubHeaderContainer = styled.div`
  margin: 65px 20px 20px 20px;
  padding-bottom: 5px;
  display: flex;
  width: 100vw;
  /* justify-content: space-between; */
  align-items: center;
  border-bottom: 1px solid #e6e8e7;
`;

const BackButton = styled.div`
  margin-left: 10px;
`;

const Admin = styled.div`
  position: absolute;
  font-weight: 700;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const DemandContainer = styled.div`
  margin-top: 20px;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const Demand = styled.div`
  display: flex;
  margin: 0 20px;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  margin-bottom: 20px;
  height: 50px;
  border: 1px solid #e6e8e7;
  border-radius: 10px;
`;

const DemandTitle = styled.div`
  font-weight: 700;
  font-size: medium;
  margin-left: 10px;
  color: #6667ab; // 컬러 변경 예정
`;

const DemandInfo = styled.div`
  font-weight: 700;
  font-size: small;
  margin-left: 10px;
`;

function AdminPage() {
  const navigate = useNavigate();
  const [modalOn, setModalOn] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSave = (data) => {
    // 수락할 시에 디비에 정보 저장
  };

  const modalOffHandler = () => {
    setModalOn(false);
  };

  const handleReject = () => {
    setModalOn(false);
    // 거절하고 나서 요청 디비에서 사라지도록 ~~
  };

  const handleSubmit = (data) => {
    console.log(data);
    handleSave(data);
    setModalOn(false);
  };

  const demands = [
    {
      nickname: "원덩덩",
      info: "서울시 중구 필동로 1길 30",
      description: "동국대학교 신공학관 9층",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/c/c2/DONGGUK_UNIVERSITY_%ED%8C%94%EC%A0%95%EB%8F%84.jpg",
    },
    {
      info: "서울시 중구 필동로 2길 30",
    },
    {
      info: "서울시 중구 필동로 3길 30",
    },
    {
      info: "서울시 중구 필동로 4길 30",
    },
    {
      info: "서울시 중구 필동로 5길 30",
    },
    {
      info: "서울시 중구 필동로 6길 30",
    },
    {
      info: "서울시 중구 필동로 7길 30",
    },
  ];

  const backHandler = () => {
    navigate("/");
  };
  return (
    <Container>
      <SubHeaderContainer>
        <BackButton onClick={backHandler}>
          <FontAwesomeIcon icon={faLessThan} />
        </BackButton>
        <Admin>관리자 페이지</Admin>
      </SubHeaderContainer>
      <DemandContainer>
        {demands.map((demand, index) => (
          <Demand
            key={index}
            onClick={() => {
              setModalOn(true);
              const selectedData = {
                nickname: demand.nickname,
                info: demand.info,
                description: demand.description,
                photo: demand.photo,
              };
              console.log(selectedData);
              setSelected(selectedData);
            }}
          >
            <DemandTitle>흡연구역 요청 </DemandTitle>
            <DemandInfo>{demand.info}</DemandInfo>
          </Demand>
        ))}
      </DemandContainer>
      {modalOn && (
        <Modal
          selectedData={selected}
          handleReject={handleReject}
          handleSubmit={handleSubmit}
          modalOffHandler={modalOffHandler}
        />
      )}
    </Container>
  );
}

export default AdminPage;
