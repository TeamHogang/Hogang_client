/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EditArticle, WriteArticle } from "../../api/articleApi";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-family: "Do Hyeon", sans-serif;
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

const EditButton = styled.div`
  margin-right: 10px;
  font-size: small;
  font-weight: 700;
`;

const RegisterButton = styled.div`
  margin-right: 10px;
  font-size: small;
  font-weight: 700;
`;

const TitleContainer = styled.div`
  width: 300px;
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
  font-family: "Do Hyeon", sans-serif;
`;

const TextareaContainer = styled.div`
  width: 300px;
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
  font-family: "Do Hyeon", sans-serif;
`;

function WriteFeed() {
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.state.isEdit;
  const id = location.state.id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const contentChange = (e) => {
    setContent(e.target.value);
  };

  const registerHandler = () => {
    //axios ??????
    let data = {
      title,
      contents: content,
    };
    WriteArticle(data).then((res) => {
      if (res.status === 200) {
        navigate("/board");
      } else {
        alert("?????? ??????????????????.");
      }
    });
  };

  const editHanlder = () => {
    //axios ??????
    let data = {
      title,
      contents: content,
    };
    EditArticle(data, id).then((res) => {
      if (res.status == 200) {
        alert("????????? ?????????????????????.");
        navigate(`/feed/${id}`);
      } else {
        alert("?????? ??????????????????.");
      }
    });
  };

  const registerBackHandler = () => {
    navigate("/board");
  };

  const editBackHandler = () => {
    navigate(`/feed/${id}`);
  };

  useEffect(() => {
    console.log(isEdit);
    if (isEdit) {
      setTitle(location.state.title);
      setContent(location.state.content);
    }
  }, []);

  return (
    <Container>
      <SubHeaderContainer>
        {isEdit ? (
          <BackButton onClick={editBackHandler}>
            <FontAwesomeIcon icon={faLessThan} size="1x" />
          </BackButton>
        ) : (
          <BackButton onClick={registerBackHandler}>
            <FontAwesomeIcon icon={faLessThan} size="1x" />
          </BackButton>
        )}

        {isEdit ? (
          <EditButton onClick={editHanlder}>????????????</EditButton>
        ) : (
          <RegisterButton onClick={registerHandler}>????????????</RegisterButton>
        )}
      </SubHeaderContainer>
      {isEdit ? (
        <div>
          <TitleContainer>
            <Title
              type="text"
              name="title"
              placeholder="??????"
              value={title}
              onChange={titleChange}
              required
            />
          </TitleContainer>
          <TextareaContainer>
            <TextArea
              placeholder="????????? ??????????????????."
              name="content"
              value={content}
              onChange={contentChange}
              required
            ></TextArea>
          </TextareaContainer>
        </div>
      ) : (
        <div>
          <TitleContainer>
            <Title
              type="text"
              name="title"
              placeholder="??????"
              value={title}
              onChange={titleChange}
              required
            />
          </TitleContainer>
          <TextareaContainer>
            <TextArea
              placeholder="????????? ??????????????????."
              name="content"
              value={content}
              onChange={contentChange}
              required
            ></TextArea>
          </TextareaContainer>
        </div>
      )}
    </Container>
  );
}

export default WriteFeed;
