"use client";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { NavigationRoutes } from "../common/constants/route";
import { tokenDecode } from "../utils/jwt";

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
  const { push } = useRouter();

  const handleToken = (value: string) => {
    setToken(value);
    setTokenStorage(value);
  };

  const handleLogout = useCallback(() => {
    const userCred = tokenDecode(token);
    if (userCred.id_role === 1) {
      push(`${NavigationRoutes.loginAdmin}`);
    } else if (userCred.id_role === 2) {
      push(`${NavigationRoutes.login}`);
    }
    handleToken("");
    
  },[push, token]);

  //technique when use localstorage, session and cookies
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const tokenStorage = getTokenStorage();
    setToken(tokenStorage || "");

    //unmount
    return () => {};
  }, [handleLogout, token]);

  React.useEffect(() => {
    if (token) {
      const userCred = tokenDecode(token);
      const expiredDate = new Date(userCred.exp * 1000);
      if (new Date().getTime() > expiredDate.getTime()) {
        handleLogout();
      }
    } else {
      handleLogout();
    }
  }, [handleLogout, token])

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
