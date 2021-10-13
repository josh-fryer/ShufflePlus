import React, { useState, useEffect } from "react";
import WebPlayback from "./WebPlayback";
import Login from "./Login";
import KoFi from "./components/KoFi";
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
      <header className="header">
        <div className="header-wrapper">
          <div className="title">ShufflePlus</div>
          <a className="header-icon">
            <i className="far fa-question-circle"></i>
          </a>
        </div>
      </header>
      {token === "" ? (
        <Login />
      ) : (
        <>
          <WebPlayback token={token} />
        </>
      )}
      <div className="footer">
        <div className="footer-wrapper">
          <div>Made by Josh Fryer.</div>
          <KoFi color="#29abe0" id="L3L7R7WE" label="Buy me a Coffee" />
          <a className="twitter-link" href="https://twitter.com/jj_fryer">
            <span className="fa-stack fa-2x">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="black fab fa-twitter fa-stack-1x fa-inverse"></i>
            </span>
          </a>
          <a className="github-btn" href="https://github.com/josh-fryer">
            <i className="fab fa-github"></i>
          </a>
          <a className="spotifyLink" href="https://developer.spotify.com/">
            Uses Spotify Api and player SDK
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
