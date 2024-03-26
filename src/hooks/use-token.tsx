"use client";
import React from "react";

export const TokenContext = React.createContext({
  token: "",
  handleToken(value: string) {},
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
  const handleToken = (value: string) => {
    setToken(value);
    setTokenStorage(value);
  };

  //technique when use localstorage, session and cookies
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const tokenStorage = getTokenStorage();
    setToken(tokenStorage || "");

    //unmount
    return () => {};
  }, []);

  return (
    <TokenContext.Provider value={{ token, handleToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = React.useContext(TokenContext);
  return context;
}
