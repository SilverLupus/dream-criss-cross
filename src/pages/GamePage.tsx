import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../components/ErrorComponent";
import LoadingIndicator from "../components/LoadingIndicator";
import { getSpecificGamesApi } from "../services/api/data";
import { Game } from "../services/types";
import GamePreview from "../components/GamePreview";
import useAppStore from "../services/data/data";

const REFETCH_GAME_INTERVAL = 5 * 1000; //5 seconds

const GamePage = () => {
  const { gameId } = useParams();
  const [refetchInterval, setRefetchInterval] = useState(REFETCH_GAME_INTERVAL);
  const [message, setMessage] = useState("");
  const user = useAppStore((store) => store.user);

  const { status, data: gameData } = useQuery<Game, Error>({
    queryKey: ["getSpecificGame", gameId],
    queryFn: () => (gameId ? getSpecificGamesApi(gameId) : Promise.reject("gameId is undefined")),
    // refetchInterval: refetchInterval
  });

  useEffect(() => {
    if (gameData?.winner && gameData.status === "finished") {
      setRefetchInterval(0);
      gameData.winner.id === user.id
        ? setMessage("You are winner!")
        : setMessage(`Player ${gameData.winner.username} is the winner`);
    }
  }, [gameData, user]);

  console.log(gameData);

  if (status === "pending") return <LoadingIndicator />;

  if (status === "error")
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <ErrorComponent error="Error has occured" isFontBig={true} />
      </div>
    );

  return (
    <div className="flex items-center justify-center flex-col pt-12 px-8 sm:px-6 gap-y-8">
      <div className="w-full flex flex-col sm:flex-row items-center sm:justify-around">
        <div className="flex items-end">
          <span className="flex items-end text-lg font-semibold mr-2"> Player 1: </span>
          <h3 className="text-3xl font-medium text-gray-900 text-red-500">
            {gameData.first_player.username}
          </h3>
        </div>
        <div className="flex">
          <span className="flex items-end text-lg font-semibold mr-2"> Player 2: </span>
          <h3 className="text-3xl font-medium text-gray-900 text-red-500">
            {gameData.second_player ? (
              <span className="text-blue-500">{gameData.second_player.username}</span>
            ) : (
              <span className="text-green-500">Waiting</span>
            )}
          </h3>
        </div>
      </div>

      <GamePreview
        board={gameData.board}
        firstPlayerId={gameData.first_player.id}
        isPlayable={true}
        winner={gameData.winner}
        gameStatus={gameData.status}
      />

      {!gameData.second_player && (
        <div>
          <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">
            Join Game
          </button>
        </div>
      )}

      {message && <div className="text-green-600 text-3xl font-semibold">{message} </div>}
    </div>
  );
};

export default GamePage;
