import React, { useState } from "react";
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
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e8e7;
`;

const BackButton = styled.div`
  margin-left: 10px;
`;

const RegisterButton = styled.div`
  margin-right: 10px;
  font-size: small;
  font-weight: 700;
`;

const TitleContainer = styled.div`
  width: 100vw;
  margin-top: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.input`
  width: 80vw;
  border: none;
  font-weight: bold;
  border-bottom: 1px solid #e6e8e7;
`;

const TextareaContainer = styled.div`
  width: 100vw;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextArea = styled.textarea`
  height: 500px;
  border: none;
  width: 80vw;
  resize: none;
`;

function WriteFeed() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const contentChange = (e) => {
    setContent(e.target.value);
  };

  const registerHandler = () => {
    //axios 추가
    navigate("/board");
  };

  return (
    <Container>
      <SubHeaderContainer>
        <BackButton>
          <FontAwesomeIcon icon={faLessThan} size="1x" />
        </BackButton>
        <RegisterButton onClick={registerHandler}>등록하기</RegisterButton>
      </SubHeaderContainer>
      <TitleContainer>
        <Title
          type="text"
          name="title"
          placeholder="제목"
          value={title}
          onChange={titleChange}
        />
      </TitleContainer>
      <TextareaContainer>
        <TextArea
          placeholder="내용을 입력해주세요."
          name="content"
          value={content}
          onChange={contentChange}
        ></TextArea>
      </TextareaContainer>
    </Container>
  );
}

export default WriteFeed;
