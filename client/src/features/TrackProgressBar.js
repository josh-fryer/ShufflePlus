import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";

var addSecond = null;
var newPosition = 0;
var i = 0; // for debugging

const TrackProgressBar = ({ duration, position, isPaused, isActive }) => {
  const [displayPosition, setDisplayPosition] = useState("00:00");
  const [livePosition, setLivePosition] = useState(position);
  const [displayDuration, setDisplayDuration] = useState("00:00");

  const formatTime = (ms) => {
    var seconds = Math.floor((ms / 1000) % 60);
    var minutes = Math.floor((ms / (60 * 1000)) % 60);
    const hours = Math.floor(ms / 3600000);

    var timeStr = `${minutes <= 9 ? "0" + minutes : minutes}:${
      seconds <= 9 ? "0" + seconds : seconds
    }`;

    if (hours > 0) {
      timeStr = hours + ":" + timeStr;
    }
    return timeStr;
  };

  useEffect(() => {
    if (addSecond != null) {
      clearInterval(addSecond);
      addSecond = null;
      newPosition = 0;
    }

    if (!isPaused && isActive) {
      // start timer here to add second in ms every second to position
      i += 1;
      addSecond = setInterval(() => {
        if (newPosition > 0) {
          newPosition += 1000;
        } else {
          newPosition = livePosition + 1000;
        }

        // check if newPosition is not over the duration of its track
        if (newPosition <= duration) {
          //console.log(i + ") newPosition ", newPosition);
          setDisplayPosition(formatTime(newPosition));
        }
      }, 1000);
    }
  }, [livePosition]);

  useEffect(() => {
    if (addSecond != null) {
      clearInterval(addSecond);
      addSecond = null;
      newPosition = 0;
    }

    setDisplayPosition(formatTime(position));
    setLivePosition(position);
  }, [position]);

  useEffect(() => {
    setDisplayDuration(formatTime(duration));
  }, [duration]);

  useEffect(() => {
    // if paused then stop timeout
    if (isPaused || !isActive) {
      console.log("isActive: ", isActive);
      if (addSecond != null) {
        clearInterval(addSecond);
        addSecond = null;
        newPosition = 0;
      }
    }
  }, [isPaused, isActive]);

  return (
    <div className="track-time">
      <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        min={0}
        step={1}
        max={duration}
        sx={{
          color: "#fff",
          height: 4,
          cursor: "default",
          "& .MuiSlider-thumb": {
            color: "transparent",
            "&:before": {},
            "&:hover, &.Mui-focusVisible": {
              boxShadow: "0px 0px 0px 8px transparent",
            },
            "&.Mui-active": {},
          },
          "& .MuiSlider-rail": {
            opacity: 0.28,
          },
        }}
      />
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          justifySelf: "flex-start",
        }}
      >
        {displayPosition}
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "flex-end",
          justifySelf: "flex-end",
        }}
      >
        {displayDuration}
      </div>
    </div>
  );
};

export default TrackProgressBar;
