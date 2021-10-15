import React from "react";

function Login() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>ShufflePlus gives you more control over spotify's shuffle</h1>
        <p>
          Stop tracks in your playlist from being repeated in shuffle playback.
          <br />
          <br />
          Pick genres to exclude from playback.
        </p>
        <p>Requires Spotify premium</p>
        <p>Press play on your playlist before logging in.</p>
        <a className="btn-login" href="/auth/login">
          Login with Spotify
        </a>
      </div>
    </div>
  );
}

export default Login;
