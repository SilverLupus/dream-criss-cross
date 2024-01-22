import { Link } from "react-router-dom";
import Logo from "../assets/logo-button.png";
import { useState } from "react";

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 start-0 end-0 h-16 bg-[#01143c] text-white mx-auto flex items-center justify-between p-4 lg:px-8"
      aria-label="Global"
    >
      <div className="flex lg:flex-1">
        <img src={Logo} alt="logo" className="w-8 h-8 hover:rotate-180 duration-300" />
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
        >
          <span className="sr-only">Open main menu</span>
        </button>
      </div>
      <div className="hidden sm:flex lg:gap-x-12">userName</div>
      <div className="hidden sm:flex lg:flex-1 lg:justify-end gap-x-3">
        <Link to="" className="text-sm font-semibold leading-6 text-white">
          Homepage
        </Link>
        <Link to="login" className="text-sm font-semibold leading-6 text-white">
          Login
        </Link>
      </div>

      <button
        type="button"
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
            <Link to="login" className="text-2xl font-semibold leading-6 text-white">
              Login
            </Link>
          </div>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
