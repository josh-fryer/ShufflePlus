import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";

const TrackProgressBar = ({ duration, position, isPaused, isActive }) => {
  const [displayPosition, setDisplayPosition] = useState("00:00");
  const [displayDuration, setDisplayDuration] = useState("00:00");

  console.log("TrackProgressBar: ", { duration: duration, position: position });

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
    // stop timer here
    setDisplayPosition(formatTime(position));
    // start timer here to add second in ms every second to position
  }, [position]);

  useEffect(() => {
    setDisplayDuration(formatTime(duration));
  }, [duration]);

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
