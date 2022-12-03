import api from "./index";

export const PostArticle = async (data) => {
  const response = await api
    .post(`${process.env.REACT_APP_SERVER_URL}/board/postArticle`, data)
    .then(function (response) {
      console.log(response);
    })
    .then(function (error) {
      console.log(error);
    });

  return response;
};

export const GetArticleDetail = async (data, id) => {
  let config = {
    headers: data,
  };
  const response = await api.post(
    `${process.env.REACT_APP_SERVER_URL}/board/${id}`,
    config
  );

  return response;
};
