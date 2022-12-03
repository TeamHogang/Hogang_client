import api from "./index";

// 미리보기
export const GetBoardThumbnail = async () => {
  const response = await api.get(`${process.env.REACT_APP_SERVER_URL}/board`);
  return response;
};

//게시물 작성
export const WriteArticle = async (data) => {
  const response = await api.post(`${process.env.REACT_APP_SERVER_URL}/board`, {
    ...data,
    userFrom: localStorage.getItem("X-AUTH-TOKEN"),
  });
  return response;
};

//게시물 수정
export const EditArticle = async (data, id) => {
  const response = await api.patch(
    `${process.env.REACT_APP_SERVER_URL}/board/${id}`,
    {
      ...data,
      userFrom: localStorage.getItem("X-AUTH-TOKEN"),
    }
  );
  return response;
};

//게시물 삭제
export const DeleteArticle = async (id) => {
  const response = await api.delete(
    `${process.env.REACT_APP_SERVER_URL}/board/${id}`
  );
  return response;
};

// 게시물 상세보기
export const GetFeed = async (id) => {
  const response = await api.get(
    `${process.env.REACT_APP_SERVER_URL}/board/${id}`
  );
  return response;
};
