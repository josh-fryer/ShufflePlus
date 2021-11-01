import React, { useState, useEffect } from "react";
import WebPlayback from "./WebPlayback";
import Login from "./Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import GetPremium from "./getSpotifyPremium";
import { Switch, Route } from "react-router-dom";
import "./style/App.css";

// var spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
// var spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const App = () => {
  const [token, setToken] = useState("");

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
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header hasToken={token == "" ? false : true} />
      <Switch>
        <Route path="/getpremium">
          {/* on login error because account is free, redirect to page where user can get spotify premium. ths follows requirements of spotify guidlines */}
          <GetPremium />
        </Route>
        <Route path="/">
          {token === "" ? (
            <Login />
          ) : (
            <>
              <WebPlayback token={token} />
            </>
          )}
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default App;
