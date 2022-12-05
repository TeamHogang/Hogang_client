import api from "./index";

export const GetDemandsList = async () => {
  const response = await api.get(`${process.env.REACT_APP_SERVER_URL}/admin`);
  return response;
};

export const GetImg = async (path) => {
  const response = await api.get(`${process.env.REACT_APP_SERVER_URL}/${path}`);
  return response;
};

export const PostAcceptList = async (id) => {
  const response = await api.post(
    `${process.env.REACT_APP_SERVER_URL}/admin/accept/${id}`
  );
  console.log(response);
  return response;
};

export const DeleteRejectList = async (id) => {
  const response = await api.delete(
    `${process.env.REACT_APP_SERVER_URL}/admin/reject/${id}`
  );
  console.log(response);
  return response;
};
