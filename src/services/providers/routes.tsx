import { createBrowserRouter } from "react-router-dom";
import GamePage from "../../pages/GamePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import NotFoundPage from "../../pages/NotFoundPage";
import GameListPage from "../../pages/GameListPage";
import Layout from "../../components/Layout";
import HomePage from "../../pages/HomePage";
import ProtectedRoute from "../../components/protectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
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
        element: <ProtectedRoute />,
        children: [
          {
            path: "game",
            element: <GameListPage />,
          },
          {
            path: "game/:gameId",
            element: <GamePage />,
          },
        ],
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
