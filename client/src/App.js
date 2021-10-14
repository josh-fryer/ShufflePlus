import React, { useState, useEffect } from "react";
import WebPlayback from "./WebPlayback";
import Login from "./Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./style/App.css";

var spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

function App() {
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const refreshAccessToken = () => {
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
          console.log("new access token: ", data.access_token);
          setToken(data.access_token);
          //setExpiresIn(data.expires_in);
        })
        .catch((error) => console.log("refresh token error: ", error));
    }
  };

  useEffect(() => {
    console;
    // get token
    fetch("/auth/token", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data.access_token);
        setRefreshToken(data.refresh_token);
      });

    // refresh access token or it expires in an hour
    const getNewToken = () => {
      fetch("/auth/new-token")
        .then((res) => res.json())
        .then((data) => {
          setToken(data.access_token);
        })
        .catch((err) => console.log("error getting new token: ", err));
    };

    setInterval(getNewToken, 50 * 60000); // 50 mins
  }, []);

  return (
    <>
      <Header />
      {token === "" ? (
        <Login />
      ) : (
        <>
          <WebPlayback token={token} />
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
