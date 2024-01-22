import { axiosInstance } from "./base";

export const getGamesApi = async (offset: number, limit: number) => {
  return await axiosInstance
    .get(`games/?limit=${limit}&offset=${(offset - 1) * limit}`)
    .then((response) => {
      return response.data;
    });
};
