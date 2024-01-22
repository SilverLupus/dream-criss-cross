import { Navigate, Outlet } from "react-router-dom";
import useCookieUser from "../hooks/useCookieUser";

const ProtectedRoute = () => {
  const { cookieUser } = useCookieUser();
  return cookieUser ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
