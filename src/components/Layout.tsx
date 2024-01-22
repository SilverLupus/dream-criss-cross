import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="mb-16">
        <Navbar />
      </header>
      <main className="h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
