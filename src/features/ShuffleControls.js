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
  ["rock", 1],
  ["pop", 1],
  ["punk", 1],
  ["acoustic", 1],
  ["alternative", 1],
  ["ambient", 1],
  ["blues", 1],
  ["classical", 1],
  ["chill", 1],
  ["comedy", 1],
  ["country", 1],
  ["dance", 1],
  ["disco", 1],
  ["electronic", 1],
  ["folk", 1],
  ["drum-and-bass", 1],
  ["dub", 1],
  ["funk", 1],
  ["gospel", 1],
  ["garage", 1],
  ["heavy-metal", 1],
  ["hip-hop", 1],
  ["house", 1],
  ["indie", 1],
  ["jazz", 1],
  ["metal", 1],
  ["new-age", 1],
  ["opera", 1],
  ["r-n-b", 1],
  ["reggae", 1],
  ["rock-n-roll", 1],
  ["romance", 1],
  ["ska", 1],
  ["soul", 1],
  ["soundtracks", 1],
  ["synth-pop", 1],
  ["techno", 1],
  ["world-music", 1],
  ["trip-hop", 1],
  ["work-out", 1],
];

// for debugging
var skipCount = 0;

function ShuffleControls({ nextTrack, currentTrack, token }) {
  const [skip, setSkip] = useState(false);
  const [genres, setGenres] = useState(genreOptions);

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
    // prevents loops from SDK
    prevTrackId = currentTrack.id;
    SaveTrack(currentTrack);
  }

  useEffect(() => {
    // getEnabledGenres(()=>{});
    // get artist id from current track
    // get artist with id to get genres[]
    // if it contains included genres play track, else skip track.
  }, [genres]);

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
          <h3>Include/exclude genres:</h3>
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
