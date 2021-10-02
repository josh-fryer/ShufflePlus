import React, { useState, useEffect } from "react";
import WebPlayback from "./WebPlayback";
import Login from "./Login";
import "./style/App.css";

var spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

function App() {
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState(3600);

  useEffect(() => {
    async function getToken() {
      const response = await fetch("/auth/token");
      const json = await response.json();
      setToken(json.access_token);
      setRefreshToken(json.refresh_token);
    }

    console;
    getToken();
    //startTimer();
    setInterval(() => refreshAccessToken(), expiresIn * 1000);
  }, []);

  const refreshAccessToken = () => {
    console.log("run refresh");
    if (refreshToken != "") {
      console.log("refreshAccessToken run");
      fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: new URLSearchParams({
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }),
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              spotify_client_id + ":" + spotify_client_secret
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("returned data; ", data);
          setToken(data.access_token);
          setExpiresIn(data.expires_in);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      {token === "" ? (
        <Login />
      ) : (
        <>
          <WebPlayback token={token} />
        </>
      )}
    </>
  );
}

export default App;
