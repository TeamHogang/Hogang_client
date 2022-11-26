import axios from "axios";

// axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  //   crossDomain: true,
  // withCredentials: true,
});

export default api;
