# [ShufflePlus](https://shuffleplus.app)
**Approved by Spotify :white_check_mark:**

This web app provides controls to improve shuffle playback on Spotify. I bulit this app to make Spotify shuffle more random and to not repeat tracks as often on large playlists.

Try it now @ [ShufflePlus.app](https://shuffleplus.app)

### How it works
When you play a track, its details are saved locally offline to your browser storage.
The track's details are used in optional ShufflePlus functions to skip tracks played in the last week, or skip tracks related to genres of your choosing.

## Using your own credentials

You will need to register your app and get your own credentials from the
[Spotify for Developers Dashboard](https://developer.spotify.com/dashboard/)

To do so, go to your Spotify for Developers Dashboard, create your
application and register the following callback URI:

`http://localhost:3000/auth/callback`

Once you have created your app, create a file called `.env` in the root folder
of the repository with your Spotify credentials:

```bash
REACT_APP_SPOTIFY_CLIENT_ID='my_client_id'
REACT_APP_SPOTIFY_CLIENT_SECRET='my_client_secret'
```

## Installation

This runs on Node.js. Download and install node [here](http://www.nodejs.org/download/).

Once installed, clone the repository and install its dependencies running:

```bash
npm install
```
and the same for the client:
```bash
npm client-install
```
## Run the app

Start both client and server with the following command:

```bash
npm run dev
```

The React application will start on `http://localhost:3000`
