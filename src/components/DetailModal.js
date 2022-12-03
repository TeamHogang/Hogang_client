import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: 600px;
  height: fit-content;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Contents = styled.div`
  text-align: center;
  margin: 50px 30px;
`;

const CancelButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 150px;
  background-color: #ffffff;
  color: #000000;
  width: 130px;
  height: 40px;
  font-size: 1rem;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  border-radius: 5px;
  border-color: #ffffff;
  font-weight: 700;
  font-style: bold;
  z-index: 999;
  opacity: 0.8;
  &:hover {
    background-color: #898989;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 350px;
  background-color: #ffffff;
  color: #000000;
  width: 130px;
  height: 40px;
  font-size: 1rem;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  border-radius: 5px;
  border-color: #ffffff;
  font-weight: 700;
  z-index: 999;
  opacity: 0.8;
`;

const Detail = styled.textarea`
  width: 80%;
  bottom: 30px;
  height: 6.25em;
  resize: none;
  font-family: LINESeedKR-Bd;
`;
const ContentLable = styled.label`
  font-family: LINESeedKR-Bd;
`;

const UploadImage = styled.div`
  margin-left: 50px;
  right: 200px;
  width: 435px;
  border: 1px solid black;
`

const CustomImg = styled.div`
`
const ImgWrap = styled.div`
  margin: 30px;
`
const UploadInput = styled.form`
`

const ImgTitle = styled.div`
  font-family: LINESeedKR-Bd;
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
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  height: 20px;
  margin-left: 10px;
`
const InputImg2 = styled.input`
  display: inline-block;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 50%;
  color: #999999;
`;

const LocationTitle = styled.div`
  font-family: LINESeedKR-Bd;
`;

const LocationInfo = styled.div`
  width: 437px;
  height: 30px;
  margin-left: 50px;
  font-family: LINESeedKR-Bd;
  border: 1px solid #000000;
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
          <InputImg2 defaultvalue="첨부파일" placeholder="첨부파일" />
          <ImgLabel htmlFor="image">파일찾기</ImgLabel>
          <CustomImg>
            <ImgWrap>
              {imageSrc && <img src={imageSrc} alt="preview-img" />}
            </ImgWrap>
          </CustomImg>
        </UploadInput>
      </UploadImage>
    );
  };

  return (
    <Overlay>
      <ModalWrap>
        <Contents>
          <LocationTitle>흡연 구역 위치 정보</LocationTitle>
          <LocationInfo>{locationDetail}</LocationInfo>
          <ImgTitle>흡연 구역 사진</ImgTitle>
          <AddImage />
          <ContentLable>
            흡연 구역 설명(필수)
            <Detail
              defaultValue={content}
              onChange={handleChange}
              placeholder="내용을 입력해 주세요."
            />
          </ContentLable>
        </Contents>
        <SubmitButton>제출하기</SubmitButton>
        <CancelButton onClick={handleClose}>취소</CancelButton>
      </ModalWrap>
    </Overlay>
  );
}

export default DetailModal;