import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import {
  GetDemandsList,
  PostAcceptList,
  DeleteRejectList,
} from "../../api/adminApi";

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
  color: #9bb7d6; // 컬러 변경 예정
`;

const DemandInfo = styled.div`
  font-weight: 700;
  font-size: small;
  margin-left: 10px;
`;

function AdminPage() {
  const navigate = useNavigate();
  const [modalOn, setModalOn] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [selected, setSelected] = useState("");

  const handleSave = (id) => {
    // 수락할 시에 디비에 정보 저장
    PostAcceptList(id).then((res) => {
      if (res.status === 200) {
        alert("흡연 구역 요청이 수락되었습니다.");
      } else {
        alert("다시 시도해주세요.");
      }
    });
  };

  const modalOffHandler = () => {
    setModalOn(false);
  };

  const handleReject = (id) => {
    DeleteRejectList(id).then((res) => {
      console.log(res);
    });
    setModalOn(false);
    window.location.replace("/admin");
  };

  const handleSubmit = (id) => {
    console.log(id);
    handleSave(id);
    setModalOn(false);
    window.location.replace("/admin");
  };

  const addImgSrc = (imgSrc) => {
    setImageSrc(imgSrc);
  };

  const [demands, setDemands] = useState([]);

  //서버에서 요청 정보 받아오기
  useEffect(() => {
    GetDemandsList().then((res) => {
      console.log(res.data);
      setDemands(res.data.requestedmarker);
    });
  }, []);

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
        {demands &&
          demands.map((demand, index) => (
            <Demand
              key={index}
              onClick={() => {
                setModalOn(true);
                const selectedData = {
                  nickname: demand.userFrom.nickname,
                  prhsmknm: demand.prhsmknm,
                  content: demand.content,
                  img: demand.img,
                  id: demand._id,
                  url: demand.url,
                };
                console.log(selectedData);
                setSelected(selectedData);
              }}
            >
              <DemandTitle>흡연구역 요청 </DemandTitle>
              <DemandInfo>{demand.prhsmknm}</DemandInfo>
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
