import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const UploadImage = styled.div`
  display: flex;
  margin-top: 15px;
`;

const CustomImg = styled.div``;
const ImgWrap = styled.div`
  width: 70vw;
`;

const UploadInput = styled.div``;

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

const AddImage = ({ addImgSrc }) => {
  const encodeFileToBase64 = (fileBlob) => {
    addImgSrc(fileBlob);
    // console.log(fileBlob);
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const [imageSrc, setImageSrc] = useState(
    "https://png.pngtree.com/png-vector/20191129/ourlarge/pngtree-image-upload-icon-photo-upload-icon-png-image_2047546.jpg"
  );

  return (
    <UploadImage>
      <UploadInput>
        <InputImg
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
          }}
          required
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

export default AddImage;
