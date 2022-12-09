/*eslint-disable */
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  font-family: "Do Hyeon", sans-serif;
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 20%;
  left: 10%;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 80vw;
  height: 500px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid #e6e8e7;
`;

const BackButton = styled.div`
  margin-right: 10px;
`;

const Demander = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  font-size: small;
  font-weight: 600;
`;

const FormInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SmokingInfoContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-weight: 600;
  border-bottom: 1px solid #e6e8e7;
`;

const SmokingImageNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-weight: 600;
  border-bottom: 1px solid #e6e8e7;
  margin: 0 20px;
`;

const SmokingImageContainer = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
`;

const SmokingInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 5px;
`;

const SmokingDemandInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 7px;
  font-size: small;
`;

const SmokingImage = styled.img`
  width: 250px;
  height: 150px;
  resize: both;
  background-size: 300px 150px;
  aspect-ratio: 16 / 9;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 80vw;
  justify-content: space-evenly; ;
`;

const SumbitButton = styled.button`
  border: 1px solid #a9a9a9;
  background-color: white;
  color: #00008b;
  width: 100px;
  height: 30px;
  border-radius: 10px;
  font-weight: 700;
  font-size: medium;
`;

const RejectButton = styled.button`
  border: 1px solid #a9a9a9;
  background-color: white;
  color: #800020;
  font-weight: 700;
  font-size: medium;
  width: 100px;
  border-radius: 10px;
`;

const Modal = ({
  selectedData,
  handleReject,
  handleSubmit,
  modalOffHandler,
}) => {
  const [selected, setSelected] = useState(selectedData);

  const onReject = () => {
    handleReject(selected.id);
  };

  const onSubmit = () => {
    handleSubmit(selected.id);
  };

  const offHandler = () => {
    modalOffHandler();
  };

  return (
    <ModalContainer>
      <ModalWrapper>
        <ModalHeader>
          <BackButton onClick={offHandler}>
            <FontAwesomeIcon icon={faTimes} />
          </BackButton>
        </ModalHeader>
        <Demander>요청자: {selected.nickname}</Demander>
        <form onSubmit={onSubmit}>
          <FormInfo>
            <SmokingInfoContainer>
              <SmokingInfo>흡연구역 위치정보</SmokingInfo>
              <SmokingDemandInfo>{selected.prhsmknm}</SmokingDemandInfo>
            </SmokingInfoContainer>
            <SmokingInfoContainer>
              <SmokingInfo>흡연구역 설명</SmokingInfo>
              <SmokingDemandInfo>{selected.content}</SmokingDemandInfo>
            </SmokingInfoContainer>
            <SmokingImageNameContainer>
              <SmokingInfo>흡연구역 사진</SmokingInfo>
            </SmokingImageNameContainer>
            <SmokingImageContainer>
              <SmokingImage src={selected.imgurl} />
            </SmokingImageContainer>
          </FormInfo>
          <ButtonContainer>
            <SumbitButton type="submit">수락</SumbitButton>
            <RejectButton onClick={onReject}>거절</RejectButton>
          </ButtonContainer>
        </form>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default Modal;
