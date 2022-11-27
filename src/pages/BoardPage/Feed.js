import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const BackButton = styled.div`
  margin: 65px 20px 20px 20px;
  padding-left: 20px;
  display: flex;
  width: 100vw;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid #e6e8e7;
`;

const FeedContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NickEditContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NickNameContainer = styled.div`
  display: flex;
  margin-left: 20px;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;

const Nickname = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: x-small;
  font-weight: 700;
`;

const Date = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: xx-small;
`;

const DeleteEditContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;
`;

const Delete = styled.div`
  color: #e6e8e7;
  font-weight: 600;
  font-size: small;
  margin-right: 10px;
`;

const Edit = styled.div`
  color: black;
  font-weight: 600;
  font-size: small;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100vw;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 20px;
`;

const Content = styled.div`
  margin-top: 10px;
  height: 300px;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Comment = styled.div`
  width: 100vw;
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const CommentNickDate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CommentNickname = styled.div`
  display: flex;
  /* justify-content: flex-start; */
  font-size: small;
  margin-left: 20px;
`;

const CommentContent = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: medium;
  margin: 0 20px 5px 20px;
  border-bottom: 1px solid #e6e8e7;
`;

const CommentDate = styled.div`
  color: #a9a9a9;
  display: flex;
  /* justify-content: flex-end; */
  font-size: xx-small;
  margin-right: 20px;
`;

function Feed() {
  const comments = [
    {
      nickname: "zz",
      content: "테스트1",
      date: "2022-11-18",
    },
    {
      nickname: "zz",
      content: "테스트2",
      date: "2022-11-18",
    },
    {
      nickname: "zz",
      content: "테스트3",
      date: "2022-11-18",
    },
    {
      nickname: "zz",
      content: "테스트4",
      date: "2022-11-18",
    },
    {
      nickname: "zz",
      content: "테스트1",
      date: "2022-11-18",
    },
    {
      nickname: "zz",
      content: "테스트2",
      date: "2022-11-18",
    },
    {
      nickname: "zz",
      content: "테스트3",
      date: "2022-11-18",
    },
    {
      nickname: "zz",
      content: "테스트4",
      date: "2022-11-18",
    },
  ];
  return (
    <Container>
      <BackButton>
        <FontAwesomeIcon icon={faLessThan} size="1x" />
      </BackButton>
      <FeedContainer>
        <NickEditContainer>
          <NickNameContainer>
            <Nickname>닉네임</Nickname>
            <Date>2022-11-27 21:20</Date>
          </NickNameContainer>
          <DeleteEditContainer>
            <Delete>삭제</Delete>
            <Edit>수정</Edit>
          </DeleteEditContainer>
        </NickEditContainer>
        <Detail>
          <Title>게시물 제목</Title>
          <Content>게시물 내용이 들어갈 자리</Content>
        </Detail>
        <CommentContainer>
          {comments.map((comment, index) => (
            <Comment key={index}>
              <CommentNickDate>
                <CommentNickname>{comment.nickname}</CommentNickname>
                <CommentDate>{comment.date}</CommentDate>
              </CommentNickDate>
              <CommentContent>{comment.content}</CommentContent>
            </Comment>
          ))}
        </CommentContainer>
      </FeedContainer>
    </Container>
  );
}

export default Feed;
