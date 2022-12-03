import api from "./index";

export const Login = async (data) => {
  const response = await api.post(`${process.env.REACT_APP_SERVER_URL}/`);
};
