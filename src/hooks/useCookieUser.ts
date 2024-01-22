import { useState } from "react";
import Cookies from "js-cookie";
import { LoginOutput } from "../services/types";
import useAppStore, { emptyUser } from "../services/data/data";

export const COOKIE_NAME = "dream-user";

const useCookieUser = () => {
  const setUser = useAppStore((state) => state.setUser);

  const getCookieUser = () => {
    const maybeUser = Cookies.get(COOKIE_NAME);
    let user: LoginOutput | null = null;
    if (maybeUser) {
      user = JSON.parse(maybeUser);
      setUser(user as LoginOutput);
    }
    return user;
  };

  const [cookieUser, setCookieUser] = useState(getCookieUser);

  const saveUser = (userData: LoginOutput) => {
    Cookies.set(COOKIE_NAME, JSON.stringify(userData));
    setCookieUser(userData);
    setUser(userData);
  };

  const removeUser = () => {
    Cookies.remove(COOKIE_NAME);
    setCookieUser(null);
    setUser(emptyUser);
  };

  return { cookieUser, setCookieUser: saveUser, removeCookieUser: removeUser };
};

export default useCookieUser;
