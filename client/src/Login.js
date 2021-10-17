import React from "react";

function Login() {
  return (
    <div className="App">
      <div className="login-container">
        <div className="login-header">
          <h1>Take control of Spotify's shuffle</h1>
        </div>

        <div className="login-content">
          <b>ShufflePlus can...</b>
          <ul>
            <li>Stop tracks from being repeated in shuffle playback.</li>
            <li>Pick genres to exclude from playback.</li>
          </ul>
          <p>
            <b>How it works</b>
            <br />
            When you start playing a track, its details are saved locally
            offline to your browser storage on your computer.
            <br />
            The track's details are used in optional functions to skip tracks
            played in the last week, or skip tracks related to genres of your
            choosing.
          </p>
        </div>
        <div className="warning">
          Requires Spotify premium.
          <br />
          Incompatible with mobile.
        </div>

        <h4>Login to get started.</h4>
        <a className="btn-login" href="/auth/login">
          Login with Spotify
        </a>
        <h6>You will be redirected to Spotify.com to authenticate</h6>
      </div>
    </div>
  );
}

export default Login;
