import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

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
  const demands = [
    {
      info: "서울시 중구 필동로 1길 30",
    },
    {
      info: "서울시 중구 필동로 1길 30",
    },
    {
      info: "서울시 중구 필동로 1길 30",
    },
    {
      info: "서울시 중구 필동로 1길 30",
    },
    {
      info: "서울시 중구 필동로 1길 30",
    },
    {
      info: "서울시 중구 필동로 1길 30",
    },
    {
      info: "서울시 중구 필동로 1길 30",
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
          <Demand key={index}>
            <DemandTitle>흡연구역 요청</DemandTitle>
            <DemandInfo>{demand.info}</DemandInfo>
          </Demand>
        ))}
      </DemandContainer>
    </Container>
  );
}

export default AdminPage;
