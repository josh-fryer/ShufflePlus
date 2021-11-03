import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const getToken = () => {
    fetch("/auth/token", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data.access_token);
      })
      .catch((err) => console.log(err));
  };

  const refreshToken = () => {
    fetch("/auth/new-token", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data.access_token);
      })
      .catch((err) => console.log("error getting new token: ", err));
  };

  const logout = () => {
    fetch("/auth/logout").catch((err) => console.log(err));
    setToken("");
    // remove tokens in server
  };

  useEffect(() => {
    // get token
    getToken();
  }, []);

  return (
    <UserContext.Provider
      value={{
        token,
        refreshToken,
        getToken,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
