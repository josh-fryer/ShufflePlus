import React, { useState, useEffect } from "react";
import { SaveTrack } from "./saveTrack";

const myStorage = window.localStorage;

var prevTrackId = "";

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
  ["drum and bass", true],
  ["dub", true],
  ["funk", true],
  ["gospel", true],
  ["garage", true],
  ["hip hop", true],
  ["house", true],
  ["indie", true],
  ["jazz", true],
  ["metal", true],
  ["new age", true],
  ["opera", true],
  ["r&b", true],
  ["reggae", true],
  ["rock and roll", true],
  ["ska", true],
  ["soul", true],
  ["soundtracks", true],
  ["techno", true],
  ["world music", true],
];

// for debugging
var skipCount = 0;

var skipTimeout = null;

const skipTrack = (nextTrack, track) => {
  var dNow = new Date().getTime();

  const week = 604800000; // a week in milliseconds

  var trackD = new Date(track.datePlayed).getTime();

  var weekAgo = dNow - week;

  // within a week so, skip track
  if (trackD > weekAgo) {
    console.log(`skipping > ${track.name}, played less than a week ago!`);
    skipCount++;
    skipTimeout = setTimeout(nextTrack, 2000);
  }
};

const ShuffleControls = ({
  nextTrack,
  currentTrack,
  isPaused,
  token: receivedToken,
}) => {
  const [skip, setSkip] = useState(false);
  const [genres, setGenres] = useState(() => {
    genreOptions.sort();
    return genreOptions.map((subarr) => [...subarr]);
  });
  const [token, setToken] = useState(receivedToken);
  const [artistGenres, setArtistGenres] = useState([]);
  const [showReset, setShowReset] = useState(false);

  const getToken = () => {
    return fetch("/auth/token")
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const resetGenres = () => {
    genreOptions.sort();
    setGenres(genreOptions.map((subarr) => [...subarr]));
  };

  const checkGenresFilter = () => {
    //get disabled Genres
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

      const getArtistGenres = (artistId) => {
        // get artist with id to get artist's genres[]
        return fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .catch((err) => console.log(err));
      };

      const startFetchCalls = async () => {
        let tokenResult = await getToken(); // get latest token
        setToken(tokenResult.access_token);

        let artistId = await getArtistId();
        let artistGResult = await getArtistGenres(artistId);

        setArtistGenres(artistGResult.genres);
      };

      startFetchCalls();
    }
  };

  useEffect(() => {
    console.log(
      `artist ${currentTrack.artists[0].name} Genres: `,
      artistGenres
    );

    const disabledGenres = genres
      .filter((item) => {
        if (item[1] === false) {
          return item;
        }
      })
      .map((item) => item[0]);

    // if it contains included genres play track, else skip track.
    if (artistGenres.length > 0 && artistGenres !== undefined) {
      var next = false;

      disabledGenres.some((g) => {
        for (let i = 0; i < artistGenres.length; i++) {
          if (artistGenres[i].includes(g)) {
            console.log(`Matched Genre ${g}. Skip: ${currentTrack.name}`);
            next = true;
            return next;
          }
        }
        if (next) {
          console.error("Next is true. loop did not break!");
        }
      });

      if (next) {
        skipCount++;
        skipTimeout = setTimeout(nextTrack, 2000);
      }
    }
  }, [artistGenres]);

  useEffect(() => {
    // reset used timeout
    if (skipTimeout != null) {
      clearTimeout(skipTimeout);
      skipTimeout = null;
    }

    let trackIndex = -1;

    if (
      currentTrack.id != "" &&
      currentTrack.id != prevTrackId &&
      Object.keys(currentTrack).length !== 0
    ) {
      // prevents loops from SDK
      prevTrackId = currentTrack.id;

      var trackHistory = JSON.parse(
        myStorage.getItem("ShufflePlusTrackHistory")
      );

      if (trackHistory != null) {
        // find current track in storage
        trackIndex = trackHistory.songs.findIndex(
          (x) => x.songId === currentTrack.id
        );

        if (trackIndex > -1) {
          const track = trackHistory.songs[trackIndex];

          // check if track was played in last week
          if (skip) {
            skipTrack(nextTrack, track);
          }
          // ### MORE CONTROL FUNCTIONS HERE ###
        }
      }

      // the "SKIP" functions that do not rely on finding saved track
      // check if skip timeout has not already been started by previous control checks
      if (skipTimeout == null) {
        // skips song if song is from enabled genre
        checkGenresFilter();
      }

      // save or upate track
      SaveTrack(currentTrack, trackIndex);
    }
  }, [currentTrack.id]);

  useEffect(() => {
    // stop skipping timeout if user pauses
    if (isPaused && skipTimeout != null) {
      clearTimeout(skipTimeout);
      skipTimeout = null;
    }
  }, [isPaused]);

  useEffect(() => {
    // show reset button if there are disabled genres
    const findDisabledGenre = genres.find((i) => i[1] === false);
    if (findDisabledGenre) {
      setShowReset(true);
    } else {
      setShowReset(false);
    }
  }, [genres]);

  const handleGenreClick = (i) => {
    const disabledGenres = genres
      .filter((item) => {
        if (item[1] === false) {
          return item;
        }
      })
      .map((item) => item[0]);

    if (disabledGenres.length == genres.length - 1) {
      alert("Must have mininmum one genre enabled");
      return;
    }
    // map to new array to avoid mutation.
    // if genre equal to index of clicked return it with bool toggled. else => genre
    setGenres(genres.map((g, j) => (j !== i ? g : [g[0], !g[1]])));
  };

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
          <h3>Include or exclude artists with these genres:</h3>
          {showReset && (
            <div className="genres-btn-bar">
              <button
                type="button"
                className="reset-btn"
                onClick={() => resetGenres()}
              >
                RESET
              </button>
            </div>
          )}
          <div className="genres-btn-container">
            {genres.map((g, i) => (
              <button
                type="button"
                key={i}
                onClick={() => {
                  handleGenreClick(i);
                }}
                className={g[(i, 1)] ? "genres-btn" : "genres-btn btn-disabled"}
              >
                {g[(i, 0)]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShuffleControls;
