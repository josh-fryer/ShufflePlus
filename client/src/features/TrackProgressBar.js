import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";

var addSecond = null; // store interval
var newPosition = 0;

const TrackProgressBar = ({ duration, position, isPaused, isActive }) => {
	const [displayTrackProgress, setDisplayTrackProgress] = useState("00:00"); // formmatted track progresss time
	const [currentTrackProgressTime, setCurrentTrackProgressTime] = useState(0); // current track progress in ms
	const [maxDurationOfTrack, setMaxDurationOfTrack] = useState("00:00"); // the max duration of the track

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

	const setTrackProgressBarTimeandPosition = (timePosition) => {
		setDisplayTrackProgress(formatTime(timePosition));
		setCurrentTrackProgressTime(timePosition);
	};

	// Stops addSecondInterval
	const resetInterval = (interval) => {
		clearInterval(interval);
		addSecond = null;
		newPosition = 0;
	};

	const startAddSecondsToTrackPosition = () => {
		addSecond = setInterval(() => {
			newPosition = currentTrackProgressTime + 1000;

			// check if newPosition is not over the duration of its track
			if (newPosition <= duration) {
				setTrackProgressBarTimeandPosition(newPosition);
			}
		}, 1000);
	};

	useEffect(() => {
		setMaxDurationOfTrack(formatTime(duration));
		return () => {
			// cleanup
			setDisplayTrackProgress("00:00");
			setCurrentTrackProgressTime(0);
			setMaxDurationOfTrack("00:00");
			addSecond = null;
		};
	}, []);

	useEffect(() => {
		if (addSecond != null) {
			resetInterval(addSecond);
		}

		if (!isPaused && isActive) {
			// start timer here to add second in ms every second to position
			startAddSecondsToTrackPosition();
		}
	}, [currentTrackProgressTime]);

	useEffect(() => {
		if (addSecond != null) {
			resetInterval(addSecond);
		}
		setTrackProgressBarTimeandPosition(position);
	}, [position]);

	useEffect(() => {
		// if paused then stop timeout
		if (isPaused || !isActive) {
			if (addSecond != null) {
				resetInterval(addSecond);
			}
		} else if (!isPaused) {
			// start interval
			startAddSecondsToTrackPosition();
		}
	}, [isPaused, isActive]);

	return (
		<div className="track-time">
			<Slider
				aria-label="time-indicator"
				size="small"
				value={currentTrackProgressTime}
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
				{displayTrackProgress}
			</div>
			<div
				style={{
					display: "flex",
					alignSelf: "flex-end",
					justifySelf: "flex-end",
				}}
			>
				{maxDurationOfTrack}
			</div>
		</div>
	);
};

export default TrackProgressBar;
