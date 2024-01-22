import { axiosInstance } from "./base";

export const registerApi = async (email: string, password: string) => {
  return await axiosInstance
    .post("register/", {
      username: email,
      password: password,
    })
    .then((response) => {
      return response;
    });
};

export const loginApi = async (email: string, password: string) => {
  return await axiosInstance
    .post("login/", {
      username: email,
      password: password,
    })
    .then((response) => {
      return response;
    });
};

export const logoutApi = async () => {
  return await axiosInstance.post("logout/").then((response) => {
    return response;
  });
};
