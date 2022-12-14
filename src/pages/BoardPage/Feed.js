/*eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteArticle, GetFeed } from "../../api/articleApi";
import { Auth } from "../../api/userApi";
import { DeleteComment, WriteComment } from "../../api/commentApi";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-family: "Do Hyeon", sans-serif;
`;

const BackButton = styled.div`
  margin: 65px 0 20px 0;
  /* padding-left: 20px; */
  display: flex;
  width: 100vw;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid #e6e8e7;
`;

const FeedContainer = styled.div`
  width: 80vw;
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
  font-size: small;
  font-weight: 700;
`;

const Date = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: xx-small;
  font-family: "Do Hyeon", sans-serif;
`;

const DeleteEditContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;
`;

const Delete = styled.button`
  display: flex;
  align-items: center;
  color: #777777;
  font-weight: 600;
  font-size: small;
  margin-right: 10px;
  border: none;
  background-color: white;
  font-family: "Do Hyeon", sans-serif;
`;

const Edit = styled.div`
  display: flex;
  color: #9bb7d6;
  font-weight: 600;
  font-size: small;
  align-items: center;
  font-family: "Do Hyeon", sans-serif;
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
  font-size: large;
  font-weight: 700;
  margin-left: 20px;
`;

const Content = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  min-height: 300px;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #e6e8e7;
  white-space: pre;
  font-size: medium;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 50px;
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
  /* justify-content: space-between; */
  margin-bottom: 10px;
`;

const CommentNickname = styled.div`
  display: flex;
  justify-content: flex-start;
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
  justify-content: flex-end;
  align-items: center;
  font-size: xx-small;
  /* margin-left: auto; */
  margin-left: 20px;
  font-family: "Do Hyeon", sans-serif;
  /* margin-right: 20px; */
`;

const CommentDelete = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #777777;
  font-weight: 600;
  font-size: small;
  border: none;
  background-color: white;
  align-items: center;
  margin-left: auto;
  margin-right: 10px;
  font-family: "Do Hyeon", sans-serif;
`;

const WriteCommentContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  z-index: 999;
`;

const CommentInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-weight: bold;
  font-family: "Do Hyeon", sans-serif;
  width: 80vw;
  border-top: 1px solid #e6e8e7;
  outline: none;
  margin: 0;
  padding-left: 10px;
`;

const CommentButton = styled.div`
  display: flex;
  width: 20vw;
  border: 1px solid #e6e8e7;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: white;
`;

function Feed() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState();
  const [user, setUser] = useState();
  const [feed, setFeed] = useState();
  const [comments, setComments] = useState();
  const [content, setContent] = useState();
  const { id } = useParams();

  useEffect(() => {
    Auth().then((res) => {
      if (!res.isAuth) {
        alert("????????? ??? ??????????????????.");
        navigate("/login");
      }
      setUser(res._id);
    });

    GetFeed(id).then((res) => {
      console.log(res);
      setNickname(res.data.usernickname);
      setFeed(res.data.board);
      setComments(res.data.comment);
    });
  }, []);

  const backHandler = () => {
    navigate("/board");
  };

  const deleteArticleHandler = () => {
    if (window.confirm("???????????? ?????????????????????????")) {
      DeleteArticle(id).then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("?????? ?????????????????????.");
          navigate("/board");
        }
      });
    }
  };

  const editArticleHandler = () => {
    navigate("/write", {
      state: {
        isEdit: true,
        id: id,
        content: feed.contents,
        title: feed.title,
      },
    });
  };

  const contentChange = (e) => {
    setContent(e.target.value);
  };

  const deleteCommentHandler = (e) => {
    const commentId = e.target.value;
    console.log(commentId);
    if (window.confirm("????????? ?????????????????????????")) {
      console.log("zz");
      DeleteComment(commentId).then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("????????? ?????????????????????.");
          window.location.replace(`/feed/${id}`);
        }
      });
    }
  };

  const commentHandler = () => {
    let data = {
      contents: content,
    };
    WriteComment(data, id).then((res) => {
      console.log(res);
      if (res.status === 200) {
        alert("?????? ????????? ?????????????????????.");
        window.location.replace(`/feed/${id}`);
      }
    });
  };

  return (
    feed && (
      <Container>
        <BackButton onClick={backHandler}>
          <FontAwesomeIcon
            icon={faLessThan}
            size="1x"
            style={{ marginLeft: "10px" }}
          />
        </BackButton>
        <FeedContainer>
          <NickEditContainer>
            <NickNameContainer>
              <Nickname>{nickname}</Nickname>
              <Date>{`${moment(feed.createdAt).format("YYYY.MM.DD")}`}</Date>
            </NickNameContainer>
            {user === feed.userFrom ? (
              <DeleteEditContainer>
                <Delete onClick={deleteArticleHandler}>??????</Delete>
                <Edit onClick={editArticleHandler}>??????</Edit>
              </DeleteEditContainer>
            ) : (
              <></>
            )}
          </NickEditContainer>
          <Detail>
            <Title>{feed.title}</Title>
            <Content>{feed.contents}</Content>
          </Detail>
          <CommentContainer>
            {comments &&
              comments.map((comment, index) => (
                <Comment key={index}>
                  <CommentNickDate>
                    <CommentNickname>
                      {comment.userFrom.nickname}
                    </CommentNickname>
                    <CommentDate>
                      {comment.createdAt.substring(0, 10)}
                    </CommentDate>
                    {user === comment.userFrom._id ? (
                      <CommentDelete
                        value={comment._id}
                        onClick={(e) => deleteCommentHandler(e)}
                      >
                        ??????
                      </CommentDelete>
                    ) : (
                      <></>
                    )}
                  </CommentNickDate>
                  <CommentContent>{comment.contents}</CommentContent>
                </Comment>
              ))}
          </CommentContainer>
        </FeedContainer>
        <WriteCommentContainer>
          <CommentInput
            type="text"
            name="comment"
            placeholder="????????? ??????????????????"
            value={content}
            onChange={contentChange}
            required
          ></CommentInput>
          <CommentButton onClick={commentHandler}>
            <FontAwesomeIcon icon={faPaperPlane} color="#9bb7d6" />
          </CommentButton>
        </WriteCommentContainer>
      </Container>
    )
  );
}

export default Feed;
