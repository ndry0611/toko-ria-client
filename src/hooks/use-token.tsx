"use client";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { NavigationRoutes } from "../common/constants/route";
import { tokenDecode } from "../utils/jwt";
import notification from "../component/notification";

export const TokenContext = React.createContext({
  token: "",
  handleToken(value: string) {},
  handleLogout() {},
});

//token storage handler
export const TOKEN_NAME = "token";

export function getTokenStorage() {
  return localStorage.getItem(TOKEN_NAME) || undefined;
}

export function setTokenStorage(value: string) {
  localStorage.setItem(TOKEN_NAME, value);
}

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState("");
  const [isSync, setIsSync] = React.useState(false);
  const { replace } = useRouter();

  const handleToken = (value: string) => {
    setToken(value);
    setTokenStorage(value);
  };

  const handleLogout = useCallback(() => {
    handleToken("");
    replace(`${NavigationRoutes.loginAdmin}`);
  }, [replace]);

  //technique when use localstorage, session and cookies
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const tokenStorage = getTokenStorage();
    setToken(tokenStorage || "");
    setIsSync(true);

    //unmount
    return () => {};
  }, []);

  React.useEffect(() => { 
    if (!isSync) return;
    if (!token) {
      handleLogout();
      return;
    }
    //
    const interval = setInterval(() => {
      if (!token) return;
      const userCred = tokenDecode(token);
      const expiredDate = new Date(userCred.exp * 1000);
      if (new Date().getTime() > expiredDate.getTime()) {
        notification.error({
          title: "Logout",
          message: "Token expired",
        });
        handleLogout();
      }
    }, 1000);

    // cleanup
    return () => {
      clearInterval(interval);
    };
  }, [handleLogout, isSync, token]);

  return (
    <TokenContext.Provider value={{ token, handleToken, handleLogout }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = React.useContext(TokenContext);
  return context;
}
