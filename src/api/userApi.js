import api from "./index";

export const Login = async (data) => {
  const response = await api.post(
    `${process.env.REACT_APP_SERVER_URL}/users/login`,
    data
  );
  console.log(response);
  return response;
};

export const Register = async (data) => {
  const response = await api.post(
    `${process.env.REACT_APP_SERVER_URL}/users/signup`,
    data
  );
  return response.data;
};

export const Auth = async (data) => {
  let config = {
    headers: data,
  };
  try {
    const response = await api.get(
      `${process.env.REACT_APP_SERVER_URL}/users/auth`,
      config
    );
    return response.data;
  } catch (ex) {
    if (ex) {
      console.log(ex.response);
    }
  }
};

export const Logout = async () => {
  const response = await api.get(
    `${process.env.REACT_APP_SERVER_URL}/users/logout`
  );
  return response;
};
