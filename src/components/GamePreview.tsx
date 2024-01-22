import { Board, GameStatus, ReducedUser } from "../services/types";

type GamePreviewProps = {
  board: Board;
  firstPlayerId: number;
  isPlayable?: boolean;
  winner?: ReducedUser | null;
  gameStatus?: GameStatus;
};

const GamePreview = ({
  board,
  firstPlayerId,
  isPlayable = false,
  winner,
  gameStatus,
}: GamePreviewProps) => {
  const displaySymbol = (userId: number | null) => {
    if (userId === null)
      return (
        <span
          className={`${
            isPlayable && winner === null && gameStatus === "progress"
              ? "cursor-pointer w-full h-full"
              : ""
          }`}
        ></span>
      );
    return userId === firstPlayerId ? (
      <span className={`text-red-500 font-bold ${isPlayable ? "text-5xl" : "text-sm"}`}>✖</span>
    ) : (
      <span className={`text-blue-500 font-bold ${isPlayable ? "text-5xl" : "text-sm"}`}>O</span>
    );
  };

  const handleBoardClick = (rowId: number, colId: number) => {
    if (isPlayable && board[rowId][colId] === null && winner !== null) {
      console.log(rowId);
      console.log(colId);
    }
  };

  return (
    <div>
      {board.map((row: Array<number | null>, rowId: number) => (
        <div key={rowId} className="flex">
          {row.map((el: number | null, colId: number) => (
            <div
              key={`${rowId}-${colId}`}
              onClick={() => handleBoardClick(rowId, colId)}
              className={`border border-gray-400 flex items-center justify-center ${
                isPlayable ? "w-20 h-20" : "w-7 h-7"
              }`}
            >
              {displaySymbol(el)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GamePreview;
