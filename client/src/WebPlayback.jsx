import React, { useState, useEffect } from "react";
import ShuffleControls from "./features/ShuffleControls";
import "./style/WebPlayback.css";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function WebPlayback(props) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);
  const [token, setToken] = useState(props.token);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "ShufflePlus Player",
        getOAuthToken: (cb) => {
          console.log("GET TOKEN cb");
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
            })
            .catch((err) => console.log("failed to get token in cb: " + err));

          cb(token);
        },
        volume: 1,
      });

      setPlayer(player);

      player.on("authentication_error", ({ message }) => {
        console.error("Failed to authenticate", message);
        console.log("trying new token");
        fetch("/auth/new-token")
          .then((res) => res.json())
          .then((data) => setToken(data.access_token));
      });

      player.on("playback_error", ({ message }) => {
        console.error("Failed to perform playback", message);
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        //console.log("state: ", state);
        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
    //console.log("props.token: ", props.token);
  }, [token]);

  const nextTrack = () => {
    //console.log(`next track called`);
    player.nextTrack();
  };

  if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b>
              {" "}
              Instance not active. Transfer your playback using your Spotify app{" "}
            </b>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="player-container">
          <div className="main-wrapper">
            <img
              src={current_track.album.images[0].url}
              className="now-playing__cover"
              alt=""
            />

            <div className="now-playing__side">
              <div className="now-playing__name">{current_track.name}</div>
              <div className="now-playing__artist">
                {current_track.artists[0].name}
              </div>
              <div className="btn-spotify-container">
                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.previousTrack();
                  }}
                >
                  <i className="fas fa-backward"></i>
                </button>

                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.togglePlay();
                  }}
                >
                  {is_paused ? (
                    <i className="fas fa-play"></i>
                  ) : (
                    <i className="fas fa-pause"></i>
                  )}
                </button>

                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.nextTrack();
                  }}
                >
                  <i className="fas fa-forward"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <ShuffleControls
          nextTrack={nextTrack}
          currentTrack={current_track}
          isPaused={is_paused}
          token={token}
        />
      </>
    );
  }
}

export default WebPlayback;
