const express = require("express");
const request = require("request");
const dotenv = require("dotenv");
const path = require("path");

const port = process.env.PORT || 5000;

global.access_token = "";
global.refresh_token = "";

dotenv.config();

var spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

var spotify_redirect_uri = "http://localhost:3000/auth/callback";
// var spotify_redirect_uri =
//   "https://shuffleplus-c524f1.netlify.app/auth/callback";

var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var app = express();

app.get("/auth/login", (req, res) => {
  var scope = "streaming user-read-email user-read-private";
  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
});

app.get("/auth/callback", (req, res) => {
  var code = req.query.code;

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      refresh_token = body.refresh_token;
      //expires_in = body.expires_in;
      res.redirect("/");
    }
  });
});

app.get("/auth/token", (req, res) => {
  res.json({ access_token: access_token, refresh_token: refresh_token });
});

app.get("/auth/new-token", (req, res) => {
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      refresh_token: refresh_token,
      grant_type: "refresh_token",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("Successfully refreshed token!");
      access_token = body.access_token;
      res.json({ access_token: access_token });
    } else {
      console.log(`error: ${error}`);
    }
  });
});

// app.listen(process.env.PORT || port, () => {
//   console.log(`Listening at port`);
// });

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("../build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
