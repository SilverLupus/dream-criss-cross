import { Board } from "../services/types";

type GamePreviewProps = {
  board: Board;
  firstPlayerId: number;
};

const GamePreview = ({ board, firstPlayerId }: GamePreviewProps) => {
  const displaySymbol = (userId: number | null) => {
    if (userId === null) return;
    return userId === firstPlayerId ? (
      <span className="text-red-500 font-bold">✖</span>
    ) : (
      <span className="text-blue-500 font-bold">O</span>
    );
  };

  return (
    <div>
      {board.map((row: Array<number | null>, rowId: number) => (
        <div key={rowId} className="flex">
          {row.map((el: number | null, colId: number) => (
            <div
              key={`${rowId}-${colId}`}
              className="w-7 h-7 border flex items-center justify-center"
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
