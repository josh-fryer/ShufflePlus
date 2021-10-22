import React from "react";

var myStorage;

// called on mount where local storage is used
export const isStorageSupported = () => {
  try {
    myStorage = window.localStorage;
    myStorage.setItem("test", "test");
    myStorage.removeItem("test");
    return myStorage;
  } catch (err) {
    console.warn(
      "This browser does not support localStorage. Features of ShufflePlus will be limited."
    );
    myStorage = false;
  }
};

export const getStorageSize = () => {
  const trackHistory = myStorage.getItem("ShufflePlusTrackHistory");
  const size = new TextEncoder().encode(trackHistory).length;
  console.log("size = " + size);
  //const kiloBytes = size / 1024;
  //const megaBytes = kiloBytes / 1024;
  const megaBytes = size / (1024 * 1024);
  return megaBytes;
};

export const saveTrackHistory = (trackHistory) => {
  try {
    myStorage.setItem("ShufflePlusTrackHistory", JSON.stringify(trackHistory));
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      // exceeded storage limit of browser
      // find oldest dateplayed tracks. sort oldest to top of songs
      const compare = (a, b) => {
        const songA = Date.parse(a.datePlayed);
        const songB = Date.parse(b.datePlayed);

        let comparison = 0;
        if (songA > songB) {
          comparison = 1;
        } else if (songA < songB) {
          comparison = -1;
        }
        return comparison;
      };
      trackHistory.songs.sort(compare);
      // remove oldest item
      trackHistory.songs.shift();
      // try again
      saveTrackHistory(trackHistory);
    }
    console.log(e);
  }
};

// export const storageTest = () => {
//   isStorageSupported();
//   var i = 0;
//   try {
//     // Test up to 10 MB
//     for (i = 0; i <= 10000; i += 250) {
//       myStorage.setItem("SP_test", new Array(i * 1024 + 1).join("a"));
//     }
//   } catch (e) {
//     myStorage.removeItem("SP_test");
//     console.log("ERROR TEST: ", e);
//     console.log("error name: ", e.name);
//   }
// };
