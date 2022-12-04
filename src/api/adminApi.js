import api from "./index";

export const GetDemandsList = async () => {
  const response = await api.get(
    `${process.env.REACT_APP_SERVER_URL}/admin`
  );
  return response;
};

export const PostAcceptList = async (data) => {
    const response = await api.post(
      `${process.env.REACT_APP_SERVER_URL}/admin/accept`,data
    );
    console.log(response);
    return response;
}

export const DeleteRejectList = async (data) => {
  const response = await api.delete(
    `${process.env.REACT_APP_SERVER_URL}/admin/reject`,
    data
  );
  console.log(response);
  return response;
};
