import { createBrowserRouter } from "react-router-dom";
import GamePage from "../../pages/GamePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import NotFoundPage from "../../pages/NotFoundPage";
import GameListPage from "../../pages/GameListPage";
import Layout from "../../components/Layout";
import HomePage from "../../pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "game",
        element: <GameListPage />,
      },
      {
        path: "game/:gameId",
        element: <GamePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
