import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo-button.png";
import { useState } from "react";
import useAppStore from "../services/data/data";
import useCookieUser from "../hooks/useCookieUser";
import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../services/api/auth";
import { AxiosError, AxiosResponse } from "axios";

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const { removeCookieUser } = useCookieUser();
  const user = useAppStore((state) => state.user);

  const navigate = useNavigate();

  const { mutate: logoutUser } = useMutation<AxiosResponse, AxiosError, void>({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      removeCookieUser();
      navigate("login");
    },
  });

  return (
    <nav
      className="fixed top-0 start-0 end-0 h-16 bg-[#01143c] text-white mx-auto flex items-center justify-between p-4 lg:px-8"
      aria-label="Global"
    >
      <div className="flex lg:flex-1">
        <img src={Logo} alt="logo" className="w-8 h-8 hover:rotate-180 duration-300" />
      </div>
      <div className="hidden sm:flex lg:gap-x-12">{user.username}</div>
      <div className="hidden sm:flex lg:flex-1 lg:justify-end gap-x-3">
        <Link to="" className="text-sm font-semibold leading-6 text-white">
          Homepage
        </Link>
        {user.id ? (
          <>
            <Link to="game">Game List</Link>
            <button
              onClick={() => logoutUser()}
              className="text-sm font-semibold leading-6 text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="login" className="text-sm font-semibold leading-6 text-white">
            Login
          </Link>
        )}
      </div>

      <div
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg sm:hidden focus:outline-none"
        onClick={() => setIsNavbarOpen((prevState) => !prevState)}
      >
        {isNavbarOpen ? (
          <span className="text-xl">✖</span>
        ) : (
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        )}
        {isNavbarOpen && (
          <div
            className={`fixed top-16 bottom-0 start-0 end-0 bg-[#01143c] transition-opacity duration-300 ease-linear flex flex-col items-center gap-y-5 pt-10 ${
              isNavbarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <Link to="" className="text-2xl font-semibold leading-6 text-white">
              Homepage
            </Link>
            {user.id ? (
              <>
                <Link to="game" className="text-2xl font-semibold leading-6 text-white">
                  Game List
                </Link>
                <button
                  onClick={() => logoutUser()}
                  className="text-2xl font-semibold leading-6 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="login" className="text-2xl font-semibold leading-6 text-white">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
