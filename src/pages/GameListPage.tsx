import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { Game, PaginateGameList, ReducedUser } from "../services/types";
import { getGamesApi, makeNewGamesApi } from "../services/api/game";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorPreview from "../components/ErrorPreview";
import { formatDate } from "../utils/helpers";
import GamePreview from "../components/GamePreview";
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";

const GAMES_PER_PAGE = 12;

const GameListPage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  const { status, data: gameListData } = useQuery<PaginateGameList, Error>({
    queryKey: ["getGameList", currentPage, GAMES_PER_PAGE],
    queryFn: () => getGamesApi(currentPage, GAMES_PER_PAGE),
  });

  const { mutate: makeNewGame, isPending } = useMutation<AxiosResponse<Game>, AxiosError, void>({
    mutationFn: () => makeNewGamesApi(),
    onSuccess: (data) => {
      navigate(`../game/${data.data.id}`);
    },
  });

  if (status === "pending") return <LoadingIndicator />;

  if (status === "error")
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <ErrorPreview error="Error has occured" isFontBig={true} />
      </div>
    );

  const isWinner = (playerId: number, winner: ReducedUser | null) => {
    if (winner === null) return;
    return playerId === winner.id;
  };

  const handleClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="mx-auto py-10 px-8 sm:px-5 xl:px-0 xl:max-w-6xl">
      <div className="flex items-center justify-center mb-5">
        <button
          onClick={() => makeNewGame()}
          disabled={isPending}
          className="flex w-fit justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 disabled:bg-gray-500"
        >
          New Game
        </button>
      </div>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gameListData.results.map((game: Game) => (
          <li
            key={game.id}
            onClick={() => navigate(`../game/${game.id}`)}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-xl hover:bg-gray-200 cursor-pointer"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-lg font-medium text-gray-900 text-red-500">
                    {game.first_player.username}{" "}
                    {isWinner(game.first_player.id, game.winner) && <>👑</>}
                  </h3>
                </div>
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-lg font-medium text-gray-900">
                    {game.second_player ? (
                      <>
                        <span className="text-blue-500">{game.second_player.username}</span>
                        {isWinner(game.second_player.id, game.winner) && <>👑</>}
                      </>
                    ) : (
                      <span className="text-green-500">WAITING</span>
                    )}
                  </h3>
                </div>
              </div>
              <GamePreview board={game.board} firstPlayerId={game.first_player.id} />
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <span className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-1 text-sm font-semibold text-gray-900">
                    {formatDate(game.created)}
                  </span>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <span className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-1 text-sm font-semibold text-gray-900 uppercase">
                    {game.status}
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-center items-center p-3 w-full h-full mt-5">
        <ReactPaginate
          initialPage={currentPage}
          activeClassName="flex items-center justify-center border-2 h-5 w-5 text-blue-500 border-gray-300 rounded"
          breakLabel="..."
          onPageChange={handleClick}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(gameListData.count / GAMES_PER_PAGE)}
          renderOnZeroPageCount={null}
          containerClassName="h-5 w-fit flex items-center justify-center flex-row px-5 relative text-blue-800"
          pageClassName="flex items-center justify-center h-7 w-7 font-bold p-2"
          nextLabel=">"
          nextClassName="flex items-center justify-center h-7 w-7 font-bold"
          previousLabel="<"
          previousClassName="flex items-center justify-center h-7 w-7 font-bold"
        />
      </div>
    </div>
  );
};

export default GameListPage;
