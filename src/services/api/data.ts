import { axiosInstance } from "./base";

export const getGamesApi = async (offset: number, limit: number) => {
  return await axiosInstance
    .get(`games/?limit=${limit}&offset=${(offset - 1) * limit}`)
    .then((response) => {
      return response.data;
    });
};


export const getSpecificGamesApi = async (gameId: string) => {
  return await axiosInstance
    .get(`games/${gameId}/`)
    .then((response) => {
      return response.data;
    });
};
