import { axiosInstance } from "./base";

export const getGamesApi = async (offset: number, limit: number) => {
  return await axiosInstance
    .get(`games/?limit=${limit}&offset=${offset * limit}`)
    .then((response) => {
      return response.data;
    });
};

export const makeNewGamesApi = async () => {
  return await axiosInstance.post(`games/`).then((response) => {
    return response;
  });
};

export const getSpecificGamesApi = async (gameId: string) => {
  return await axiosInstance.get(`games/${gameId}/`).then((response) => {
    return response.data;
  });
};

export const joinGamesApi = async (gameId: string) => {
  return await axiosInstance.post(`games/${gameId}/join/`).then((response) => {
    return response;
  });
};

export const makeMoveGamesApi = async (gameId: string | undefined, row: number, col: number) => {
  if (gameId === undefined) return Promise.reject();
  return await axiosInstance
    .post(`games/${gameId}/move/`, {
      row: row,
      col: col,
    })
    .then((response) => {
      return response;
    });
};
