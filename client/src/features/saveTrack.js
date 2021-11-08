import { saveTrackHistory } from "../services/localStorage";

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

const updateTrack = () => {};

export const SaveTrack = (track, trackIndex) => {
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

    saveTrackHistory(newTrackHistory);
    console.log("new track history saved: ", newTrackHistory);
  } else {
    // update track history
    const trackHistoryParse = JSON.parse(trackHistory);
    let foundTrackIndex;

    if (trackIndex < 0) {
      // no trackIndex passed in so run find
      foundTrackIndex = trackHistoryParse.songs.findIndex(
        (x) => x.songId === track.id
      );
    } else {
      foundTrackIndex = trackIndex;
    }

    // find track then update its details
    if (foundTrackIndex >= 0) {
      const trackObj = trackHistoryParse.songs[foundTrackIndex];
      trackObj.playCounter += 1;
      trackObj.datePlayed = dateToday;

      saveTrackHistory(trackHistoryParse);
      console.log("Updated track history: ", trackHistoryParse);
    } else {
      // add new track to track history
      trackHistoryParse.songs.push(prepTrack);
      saveTrackHistory(trackHistoryParse);
      console.log("added song to track history: ", trackHistoryParse);
    }
  }
};
