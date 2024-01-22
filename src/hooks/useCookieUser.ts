import { useState } from "react";
import Cookies from "js-cookie";
import { LoginOutput } from "../services/types";
import useAppStore, { emptyUser } from "../services/data/data";

export const COOKIE_NAME = "dream-user";

const useCookieUser = () => {
  const setUser = useAppStore((state) => state.setUser);
  const user = useAppStore((state) => state.user);

  const getCookieUser = () => {
    const maybeUser = Cookies.get(COOKIE_NAME);
    let appUser: LoginOutput | null = null;
    if (maybeUser) {
      appUser = JSON.parse(maybeUser);
      if (!user.token) setUser(appUser as LoginOutput);
    }
    return appUser;
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
