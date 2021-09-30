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

function ShuffleControls({ nextTrack, currentTrack }) {
  const [skip, setSkip] = useState(false);

  //find current track in storage
  var trackHistory = JSON.parse(myStorage.getItem("ShufflePlusTrackHistory"));
  if (trackHistory != null) {
    const track = trackHistory.songs.find((x) => x.songId === currentTrack.id);

    if (track != null && track.songId != prevTrackId) {
      // check if track was played in last week
      if (skip) {
        console.log("SKIPPED SONG");
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
          <h3>Some control here:</h3>
          <button className="controls-button" type="button" onClick={() => {}}>
            NOT Working
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShuffleControls;
