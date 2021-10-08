import { check } from "prettier";
import React, { useState, useEffect } from "react";

import { SaveTrack } from "./saveTrack";

const myStorage = window.localStorage;

var prevTrackId = "";

const SkipTrack = (nextTrack, track) => {
  var dNow = new Date().getTime();

  const week = 604800000; // a week in milliseconds

  var trackD = new Date(track.datePlayed).getTime();

  var weekAgo = dNow - week;

  // within a week so, skip track
  if (trackD > weekAgo) {
    nextTrack();
  }
};

const genreOptions = [
  ["rock", true],
  ["pop", true],
  ["punk", true],
  ["acoustic", true],
  ["alternative", true],
  ["ambient", true],
  ["blues", true],
  ["classical", true],
  ["chill", true],
  ["comedy", true],
  ["country", true],
  ["dance", true],
  ["disco", true],
  ["electronic", true],
  ["folk", true],
  ["drum-and-bass", true],
  ["dub", true],
  ["funk", true],
  ["gospel", true],
  ["garage", true],
  ["heavy-metal", true],
  ["hip-hop", true],
  ["house", true],
  ["indie", true],
  ["jazz", true],
  ["metal", true],
  ["new-age", true],
  ["opera", true],
  ["r-n-b", true],
  ["reggae", true],
  ["rock-n-roll", true],
  ["romance", true],
  ["ska", true],
  ["soul", true],
  ["soundtracks", true],
  ["synth-pop", true],
  ["techno", true],
  ["world-music", true],
  ["trip-hop", true],
  ["work-out", true],
];

// for debugging
var skipCount = 0;

function ShuffleControls({ nextTrack, currentTrack }) {
  const [skip, setSkip] = useState(false);
  const [genres, setGenres] = useState(genreOptions);
  const [token, setToken] = useState("");
  const [artistGenres, setArtistGenres] = useState([]);

  const getToken = () => {
    fetch("/auth/token")
      .then((res) => res.json())
      .then((data) => {
        setToken(data.access_token);
        console.log("data from set token: ", data.access_token);
      })
      .catch((err) => console.log(err));
  };

  const checkGenresFilter = () => {
    //get Enabled Genres
    const disabledGenres = genres
      .filter((item) => {
        if (item[1] === false) {
          return item;
        }
      })
      .map((item) => item[0]);

    if (disabledGenres.length >= 1) {
      // get artist id from current track
      const getArtistId = () => {
        let uri = currentTrack.artists[0].uri;
        let arr = uri.split(":");
        return arr[2];
      };

      getToken(); // get latest token
      console.log("token after getToken(): ", token);

      // get artist with id to get artist's genres[]
      fetch(`https://api.spotify.com/v1/artists/${getArtistId()}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("DATA: ", data);
          setArtistGenres(data.genres);
        })
        .catch((err) => console.log(err));

      console.log("artist Genres: ", artistGenres);
      //if it contains included genres play track, else skip track.
      if (artistGenres.length > 0) {
        disabledGenres.forEach((g) => {
          for (let i = 0; i < artistGenres.length; i++) {
            if (g === artistGenres[i]) {
              console.log("Genre filter match found. Skip Track");
              //nextTrack();
            }
          }
        });
      }
    }
  };

  //find current track in storage
  var trackHistory = JSON.parse(myStorage.getItem("ShufflePlusTrackHistory"));
  if (trackHistory != null) {
    const track = trackHistory.songs.find((x) => x.songId === currentTrack.id);

    if (track != null && track.songId != prevTrackId) {
      // check if track was played in last week
      if (skip) {
        skipCount++;
        console.log("SKIPPED SONG's = " + skipCount);
        SkipTrack(nextTrack, track);
      }

      // ### MORE CONTROL FUNCTIONS HERE ###
    }
  }

  // Save or update track
  if (
    currentTrack.name != "" &&
    currentTrack.id != prevTrackId &&
    Object.keys(currentTrack).length !== 0
  ) {
    // skips song if song is from enabled genre
    checkGenresFilter();

    // prevents loops from SDK
    prevTrackId = currentTrack.id;
    SaveTrack(currentTrack);
  }

  return (
    <div className="controls-container">
      <div className="controls-container-item">
        <div className="controls-content">
          <h3>Skip songs played in the last week:</h3>
          <button
            className="controls-button"
            type="button"
            onClick={() => {
              setSkip(!skip);
            }}
          >
            {skip ? "ON" : "OFF"}
          </button>
        </div>
      </div>
      <div className="controls-container-item">
        <div className="controls-content">
          <h3>
            Include/exclude genres:{" "}
            <small>(min 1 genre must be included)</small>
          </h3>
          {genres.map((g, i) => (
            <button
              type="button"
              key={i}
              onClick={() => {
                g[(i, 1)] = !g[(i, 1)];
                setGenres([...genres]);
              }}
              className={g[(i, 1)] ? "genres-btn" : "genres-btn btn-disabled"}
            >
              {g[(i, 0)]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShuffleControls;
