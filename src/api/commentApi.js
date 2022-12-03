import api from "./index";

export const WriteComment = async (data, id) => {
  const response = await api.post(
    `${process.env.REACT_APP_SERVER_URL}/${id}/comment`,
    {
      ...data,
      userFrom: localStorage.getItem("X-AUTH-TOKEN"),
    }
  );
  return response;
};

export const DeleteComment = async (id) => {
  const response = await api.delete(
    `${process.env.REACT_APP_SERVER_URL}/comment/${id}`
  );
  return response;
};

export const EditComment = async (data, id) => {
  const response = await api.patch(
    `${process.env.REACT_APP_SERVER_URL}/comment/${id}`,
    {
      ...data,
      userFrom: localStorage.getItem("X-AUTH-TOKEN"),
    }
  );
  return response;
};
