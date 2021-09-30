import React, { useEffect } from "react";

const myStorage = window.localStorage;

const trackHistoryRef = {
  songs: [
    {
      datePlayed: "Tue Sep 21 2021 21:30:30 GMT+0100 (British Summer Time)",
      songName: "Mr. Brightside",
      songId: "322345sasf243",
      artist: "Killers",
      playCounter: 1,
    },
  ],
};

export const SaveTrack = (track) => {
  //myStorage.removeItem("ShufflePlusTrackHistory");
  var trackHistory = myStorage.getItem("ShufflePlusTrackHistory");

  const dateToday = new Date();

  const prepTrack = {
    datePlayed: dateToday,
    songName: track.name,
    songId: track.id,
    artist: track.artists[0].name,
    playCounter: 1,
  };

  // there is no saved history so do initial save of history
  if (trackHistory == null && track.id != "undefined") {
    const newTrackHistory = {
      songs: [prepTrack],
    };

    console.log("new track history: ", newTrackHistory);

    myStorage.setItem(
      "ShufflePlusTrackHistory",
      JSON.stringify(newTrackHistory)
    );
  } else {
    // update track history
    const trackHistoryParse = JSON.parse(trackHistory);
    //console.log("Parsed track history : ", trackHistoryParse);

    const foundTrack = trackHistoryParse.songs.findIndex(
      (x) => x.songId === track.id
    );
    console.log("found track: ", foundTrack);

    // find if track already exists in trackHistory
    if (foundTrack >= 0) {
      console.log(
        "songs[foundTrack] before change: ",
        trackHistoryParse.songs[foundTrack]
      );
      trackHistoryParse.songs[foundTrack].playCounter += 1;
      trackHistoryParse.songs[foundTrack].datePlayed = dateToday;

      console.log(
        "trackHistoryParse after increase playCounter: ",
        trackHistoryParse
      );

      myStorage.setItem(
        "ShufflePlusTrackHistory",
        JSON.stringify(trackHistoryParse)
      );
    } else {
      // add track to track history
      trackHistoryParse.songs.push(prepTrack);

      console.log("added song to track history: ", trackHistoryParse);

      myStorage.setItem(
        "ShufflePlusTrackHistory",
        JSON.stringify(trackHistoryParse)
      );
    }
  }
};
