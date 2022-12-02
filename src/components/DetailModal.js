/* eslint-disable */
import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

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

const SmokingInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 5px;
`;

const UploadImage = styled.div`
  display: flex;
  margin-top: 15px;
`;

const CustomImg = styled.div``;
const ImgWrap = styled.div`
  /* margin: 30px; */
  width: 70vw;
`;

const UploadInput = styled.form``;

const ImgTitle = styled.div`
  font-family: LINESeedKR-Bd;
  display: flex;
`;
const InputImg = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;
const ImgLabel = styled.label`
  position: absolute;
  top: 102px;
  left: 140px;
  padding: 5px 20px;
  border: 1px solid #a9a9a9;
  border-radius: 10px;
  color: black;
  cursor: pointer;
  width: 100px;
  height: 20px;
`;
const InputImg2 = styled.input`
  display: none;
  height: 30px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 50%;
  color: #999999;
`;

const PreviewImg = styled.img`
  width: 70vw;
  height: 150px;
  resize: both;
  background-size: 200px 150px;
  aspect-ratio: 4 / 3;
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

function DetailModal({ onClose, locationDetail }) {
  /*global kakao*/
  const handleClose = () => {
    onClose?.();
  };

  const [content, setContent] = useState("");
  const handleChange = (e) => {
    setContent(e.target.content);
  };

  const [imageSrc, setImageSrc] = useState("");

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const offHandler = () => {};

  const AddImage = () => {
    return (
      <UploadImage>
        <UploadInput>
          <InputImg
            type="file"
            id="image"
            accept="img/*"
            onChange={(e) => {
              encodeFileToBase64(e.target.files[0]);
            }}
          />
          <InputImg2 defaultvalue="첨부파일" placeholder="첨부파일" disabled />
          <ImgLabel htmlFor="image">파일찾기</ImgLabel>
          <CustomImg>
            <ImgWrap>
              <PreviewImg src={imageSrc} />
            </ImgWrap>
          </CustomImg>
        </UploadInput>
      </UploadImage>
    );
  };

  return (
    <ModalContainer>
      <ModalWrapper>
        <ModalHeader>
          <BackButton onClick={offHandler}>
            <FontAwesomeIcon icon={faTimes} />
          </BackButton>
        </ModalHeader>
        <form>
          <FormInfo>
            <LocationContainer>
              <LocationTitle>흡연 구역 위치 정보</LocationTitle>
              <LocationInfo>{locationDetail}</LocationInfo>
            </LocationContainer>
            <LocationImageContainer>
              <ImgTitle>흡연 구역 사진</ImgTitle>
              <AddImage />
            </LocationImageContainer>
            <TextareaContainer>
              <SmokingInfo>흡연 구역 설명(필수)</SmokingInfo>
              <Detail
                defaultValue={content}
                onChange={handleChange}
                placeholder="내용을 입력해 주세요."
              />
            </TextareaContainer>
          </FormInfo>
          <ButtonContainer>
            <SubmitButton>제출하기</SubmitButton>
            <CancelButton onClick={handleClose}>취소</CancelButton>
          </ButtonContainer>
        </form>
      </ModalWrapper>
    </ModalContainer>
  );
}

export default DetailModal;
