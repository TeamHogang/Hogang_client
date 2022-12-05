/* eslint-disable */
import React, { useEffect, useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AddImage from "./AddImage";
import { PostMarkerDetail } from "../api/mapApi";
import { useNavigate } from "react-router-dom";
import { Auth } from "../api/userApi";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 10%;
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

const FormInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const LocationContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-weight: 600;
  border-bottom: 1px solid #e6e8e7;
  font-family: LINESeedKR-Bd;
`;

const LocationImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-weight: 600;
  border-bottom: 1px solid #e6e8e7;
  margin: 0 20px;
`;

const TextareaContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  font-weight: 600;
  border-bottom: 1px solid #e6e8e7;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 80vw;
  justify-content: space-evenly; ;
`;

const CancelButton = styled.button`
  border: 1px solid #a9a9a9;
  background-color: white;
  color: #800020;
  font-weight: 700;
  font-size: medium;
  width: 100px;
  border-radius: 10px;
`;

const SubmitButton = styled.button`
  border: 1px solid #a9a9a9;
  background-color: white;
  color: #00008b;
  width: 100px;
  height: 30px;
  border-radius: 10px;
  font-weight: 700;
  font-size: medium;
`;

const Detail = styled.textarea`
  margin-top: 20px;
  margin-bottom: 20px;
  resize: none;
  display: flex;
  align-items: center;
  font-family: LINESeedKR-Bd;
`;
const ContentLable = styled.label`
  font-family: LINESeedKR-Bd;
`;
const ImgTitle = styled.div`
  font-family: LINESeedKR-Bd;
  display: flex;
`;
const SmokingInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 5px;
`;

const LocationTitle = styled.div`
  font-family: LINESeedKR-Bd;
`;

const LocationInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 7px;
  font-size: small;
`;

function DetailModal({ onClose, locationDetail, position }) {
  /*global kakao*/
  const [imageSrc, setImageSrc] = useState(null);
  const [userFrom, setUserFrom] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // setUserFrom(localStorage.getItem("X-AUTH-TOKEN"));
    let data = {
      "X-AUTH-TOKEN": window.localStorage.getItem("X-AUTH-TOKEN"),
    };
    Auth(data).then((res) => {
      setUserFrom(res._id);
    });
  }, []);

  const addImgSrc = (imgSrc) => {
    setImageSrc(imgSrc);
    console.log(imgSrc);
  };

  const handleClose = () => {
    onClose?.();
  };

  const submitHandler = () => {
    // e.preventDefault();
    const formData = new FormData();

    formData.append("prhsmknm", locationDetail);
    formData.append("content", content);
    formData.append("latitude", position.lat);
    formData.append("longitude", position.lng);
    formData.append("userFrom", userFrom);
    formData.append("type", 1);
    formData.append("img", imageSrc);

    PostMarkerDetail(formData).then((res) => {
      if (res.status === 200) {
        alert("흡연구역 요청이 완료되었습니다.");
        navigate("/map");
      }
    });
  };

  const [content, setContent] = useState("");
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const offHandler = () => {};

  return (
    <ModalContainer>
      <ModalWrapper>
        <ModalHeader>
          <BackButton onClick={offHandler}>
            <FontAwesomeIcon icon={faTimes} />
          </BackButton>
        </ModalHeader>
        <div>
          <FormInfo>
            <LocationContainer>
              <LocationTitle>흡연 구역 위치 정보</LocationTitle>
              <LocationInfo>{locationDetail}</LocationInfo>
            </LocationContainer>
            <LocationImageContainer>
              <ImgTitle>흡연 구역 사진</ImgTitle>
              <AddImage addImgSrc={addImgSrc} />
            </LocationImageContainer>
            <TextareaContainer>
              <SmokingInfo>흡연 구역 설명(필수)</SmokingInfo>
              <Detail
                value={content}
                onChange={handleChange}
                placeholder="내용을 입력해 주세요."
              />
            </TextareaContainer>
          </FormInfo>
          <ButtonContainer>
            <SubmitButton onClick={submitHandler}>제출하기</SubmitButton>
            <CancelButton onClick={handleClose}>취소</CancelButton>
          </ButtonContainer>
        </div>
      </ModalWrapper>
    </ModalContainer>
  );
}

export default DetailModal;
