import axios from "axios";
import Cookies from "js-cookie";
import { COOKIE_NAME } from "../../hooks/useCookieUser";
import { LoginOutput } from "../types";

const BASE_URL = "https://tictactoe.aboutdream.io/";

export const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use(
  async (config) => {
    const maybeUser = Cookies.get(COOKIE_NAME);
    let user: LoginOutput | null = null;
    if (maybeUser) {
      user = JSON.parse(maybeUser);
      config.headers["Authorization"] = `Bearer ${user?.token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      const maybeUser = Cookies.get(COOKIE_NAME);
      if (maybeUser) {
        Cookies.remove(COOKIE_NAME);
        location.reload();
      }
    }

    return Promise.reject(error);
  }
);
