import React, { useState, useEffect } from "react";
import WebPlayback from "./WebPlayback";
import Login from "./Login";
const webpack = require("webpack");
import "./style/App.css";

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

function App() {
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    async function getToken() {
      const response = await fetch("/auth/token");
      const json = await response.json();
      console.log("getToken() json: ", json);
      setToken(json.access_token);
      setRefreshToken(json.refresh_token);
    }

    const refreshAccessToken = () => {
      console.log(
        `spotify_client_secret: ${spotify_client_secret} | spotify_client_id: ${spotify_client_id}`
      );
      if (refreshToken != "") {
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
          .then((data) => console.log("returned data; ", data));
      }
    };

    console;
    getToken();
    //setTimeout(refreshToken(), refreshAccessToken.expiresIn * 1000);
    setTimeout(refreshAccessToken(), 60000);
  }, []);

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
