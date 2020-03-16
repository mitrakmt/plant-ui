import axios from "axios";
import { getAuthToken } from "./token";
import { logout } from "redux/user";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`
});

instance.interceptors.request.use(config => {
  const token = getAuthToken();

  if (token) {
    config.headers.token = `${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  response => {
    if (response.status === "401" || response.status === "403") {
      logout();
    }
    return response;
  },
  error => {
    // handle the response error
    return Promise.reject(error);
  }
);

export default instance;
