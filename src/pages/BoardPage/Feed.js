import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
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

const Delete = styled.button`
  color: #e6e8e7;
  font-weight: 600;
  font-size: small;
  margin-right: 10px;
  border: none;
  background-color: white;
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
  border-bottom: 1px solid #e6e8e7;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
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

const WriteCommentContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 999;
`;

const CommentInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-weight: bold;
  font-size: 20px;
  width: 80vw;
  border-top: 1px solid #e6e8e7;
  outline: none;
`;

const CommentButton = styled.div`
  display: flex;
  width: 20vw;
  border: 1px solid #e6e8e7;
  justify-content: center;
  align-items: center;
  font-weight: bold;
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
        alert("로그인 후 이용해주세요.");
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
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      DeleteArticle(id).then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("삭제 완료되었습니다.");
          navigate("/board");
        }
      });
    }
  };

  const editArticleHandler = () => {
    navigate("/write", { state: { isEdit: true, id: id } });
  };

  const contentChange = (e) => {
    setContent(e.target.value);
  };

  const deleteCommentHandler = (e) => {
    // console.log(e.target.value);
    let commentId = e.target.value;
    console.log(commentId);
    // console.log(commentId);
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      DeleteComment(commentId).then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("삭제 완료되었습니다.");
          window.location.replace(`/feed/${id}`);
        }
      });
    }
  };

  // const editCommentHandler = () => {
  //   // navigate("/write", { state: { isEdit: true, id: id } });
  // };

  const commentHandler = () => {
    let data = {
      contents: content,
    };
    WriteComment(data, id).then((res) => {
      console.log(res);
      if (res.status === 200) {
        alert("댓글 작성이 완료되었습니다.");
        window.location.replace(`/feed/${id}`);
      }
    });
  };

  return (
    feed && (
      <Container>
        <BackButton onClick={backHandler}>
          <FontAwesomeIcon icon={faLessThan} size="1x" />
        </BackButton>
        <FeedContainer>
          <NickEditContainer>
            <NickNameContainer>
              <Nickname>{nickname}</Nickname>
              <Date>2022-11-27 21:20</Date>
            </NickNameContainer>
            {user === feed.userFrom ? (
              <DeleteEditContainer>
                <Delete onClick={deleteArticleHandler}>삭제</Delete>
                <Edit onClick={editArticleHandler}>수정</Edit>
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
                      <DeleteEditContainer>
                        <Delete
                          value={comment._id}
                          onClick={(e) => deleteCommentHandler(e)}
                        >
                          삭제
                        </Delete>
                        {/* <Edit onClick={editCommentHandler}>수정</Edit> */}
                      </DeleteEditContainer>
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
            placeholder="댓글을 작성해주세요"
            value={content}
            onChange={contentChange}
          ></CommentInput>
          <CommentButton onClick={commentHandler}>작성</CommentButton>
        </WriteCommentContainer>
      </Container>
    )
  );
}

export default Feed;
