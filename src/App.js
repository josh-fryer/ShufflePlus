import React, { useState, useEffect } from "react";
import WebPlayback from "./WebPlayback";
import Login from "./Login";
import "./style/App.css";

var spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

function App() {
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const refreshAccessToken = () => {
    console.log(`run refresh: ${refreshToken}`);
    if (refreshToken !== "") {
      console.log("refresh token: ", refreshToken);
      console.log("refreshAccessToken running fetch");
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
          if (data.error) {
            console.log("returned data error: ", data);
            return;
          }
          console.log("returned data: ", data);
          setToken(data.access_token);
          //setExpiresIn(data.expires_in);
        })
        .catch((error) => console.log("refresh token error: ", error));
    }
  };

  useEffect(() => {
    async function getToken() {
      const response = await fetch("/auth/token");
      const json = await response.json();
      setToken(json.access_token);
      await setRefreshToken(json.refresh_token);
      setInterval(refreshAccessToken, 50 * 60000); // 50 mins
      //setInterval(refreshAccessToken, 4000); // 50 mins
    }

    console;
    getToken();
    // when access token expires, get new token
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
