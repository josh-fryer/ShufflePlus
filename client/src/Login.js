import React from "react";

function Login() {
  return (
    <div className="App">
      <div className="App-header">
        <p>Press play on your playlist before logging in.</p>
        <a className="btn-login" href="/auth/login">
          Login with Spotify
        </a>
      </div>
    </div>
  );
}

export default Login;
