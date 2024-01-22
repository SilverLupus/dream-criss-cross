export type Board = Array<Array<number | null>>;

export type RegisterInput = {
  username: string;
  password: string;
};

export type GameStatus = "open" | "progress" | "finished";

export type ReducedUser = {
  id: number;
  username: string;
};

export type LoginOutput = ReducedUser & {
  token: string;
};

export type Game = {
  id: number;
  board: Board;
  winner: ReducedUser | null;
  first_player: ReducedUser;
  second_player: ReducedUser | null;
  created: string;
  status: GameStatus;
};

export type PaginateGameList = {
  count: number;
  previous: string;
  next: string;
  results: Array<Game>;
};

export type MakeMove = {
  row: number;
  col: number;
};
