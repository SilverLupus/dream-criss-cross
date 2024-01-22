import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header className="mb-16">
        <Navbar />
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
