import { useState, useEffect, useContext } from "react";
import ShuffleControls from "./features/ShuffleControls";
import TrackProgressBar from "./features/TrackProgressBar";
import OpenSpotifyLink from "./components/track_link";
import "./style/WebPlayback.css";
import spotifyIcon from "./assets/Spotify_Icon_White.png";
import explicitIcon from "./assets/19badge-dark.png";
import { UserContext } from "./services/UserContext";
import { Redirect } from "react-router-dom";

var track = {
	name: "",
	album: {
		images: [{ url: "" }],
	},
	artists: [{ name: "" }],
};

function WebPlayback() {
	const context = useContext(UserContext);
	const [hasWebPlayerInitialized, setHasWebPlayerInitialized] = useState(false);
	const [is_paused, setPaused] = useState(false);
	const [is_active, setActive] = useState(false);
	const [playerObj, setPlayerObj] = useState(undefined);
	const [currentTrack, setTrack] = useState(track);
	const [isExplicit, setIsExplicit] = useState(false);
	const [trackProgress, setTrackProgress] = useState({
		duration: 0,
		position: 0,
		timestamp: 0,
	});
	const [key, setKey] = useState(Math.random());

	// eslint-disable-next-line no-unused-vars
	const [avgBgColour, setAvgBgColour] = useState({ r: 46, g: 46, b: 46 });

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: "ShufflePlus Player",
				getOAuthToken: async (cb) => {
					// Is called by spotify first to initialise, then after the token expires in 1hr to retrieve a new token

					console.log("GET ACCESS TOKEN for web player SDK");
					let accessToken = await context.getToken();

					if (!accessToken) {
						console.error("Token could not be fetched");
						return;
					}

					if (hasWebPlayerInitialized) {
						// token has expired. get new token:
						console.log("Retrieving new access token.");
						accessToken = await context.refreshToken();
					} else {
						setHasWebPlayerInitialized(true);
					}

					console.log(
						"new access token sending to Spotify Player SDK: " + accessToken,
					);
					cb(accessToken);
				},
				volume: 1, // 1 = full volume
			});

			setPlayerObj(player);

			player.on("account_error", ({ message }) => {
				console.error("Failed to validate Spotify account", message);
				// navigate to page to get premium for user.
				<Redirect to="/getpremium" />;
			});

			player.on("initialization_error", ({ message }) => {
				console.error("Failed to initialize", message);
			});

			player.on("authentication_error", ({ message }) => {
				console.error("Failed to authenticate", message);
				console.log("playerObj = ", playerObj);
			});

			player.on("playback_error", ({ message }) => {
				console.error("Failed to perform playback", message);
			});

			player.addListener("ready", ({ device_id }) => {
				console.log("Ready with Device ID", device_id);
			});

			player.addListener("not_ready", ({ device_id }) => {
				console.log("Device ID has gone offline", device_id);
			});

			player.addListener("player_state_changed", (state) => {
				if (!state) {
					return;
				}

				const newTrack = state.track_window.current_track;
				setTrack(newTrack);

				setPaused(state.paused);
				const progressObj = {
					duration: state.duration,
					position: state.position,
					timestamp: state.timestamp,
				};
				setTrackProgress(progressObj);

				player.getCurrentState().then((state) => {
					state ? setActive(true) : setActive(false);
					if (state == false) {
						console.log("player state is false");
					}
				});
			});

			player.connect();
		};

		return function cleanUp() {
			setPlayerObj(undefined);
		};
	}, []);

	// update track window details
	useEffect(() => {
		if (currentTrack.id === undefined) {
			console.log("curr track is undefined ", currentTrack);
			return;
		}
		// let avgColour = getAvgColourToBackground(currentTrack.album.images[0].url);
		// if(avgColour !== undefined)
		// {
		// 	setAvgBgColour(avgColour);
		// 	console.log("avg colour is ", avgBgColour);
		// }

		let id = currentTrack.id;

		fetch(`https://api.spotify.com/v1/tracks/${id}`, {
			headers: {
				Authorization: `Bearer ${context.token}`,
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				// spotify api rules to show explicit
				data.explicit ? setIsExplicit(true) : setIsExplicit(false);
			})
			.catch((err) => console.log("fetch track error: ", err));

		// reset track progress bar and any other dependent components
		setKey(Math.random());
	}, [currentTrack]);

	const nextTrack = () => {
		console.log("next track called");
		playerObj.nextTrack();
	};

	const playerContainerStyle = {
		backgroundColor: `rgb(${avgBgColour.r}, ${avgBgColour.g}, ${avgBgColour.b})`,
		alignItems: "flex-start",
		display: "flex",
		justifyContent: "center",
		height: "100%",
		width: "100%",
		margin: 0,
		padding: 0,
	};

	if (!is_active) {
		return (
			<>
				<div className="container">
					<div className="main-wrapper-InActive">
						<b>
							{" "}
							Transfer your playback to ShufflePlus from the device list in the
							Spotify app.
						</b>
						<br />
						<br />
						If ShufflePlus is not appearing in the devices list, try logging out
						and log in again.
					</div>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div style={playerContainerStyle}>
					<div className="main-wrapper">
						<img
							src={currentTrack.album.images[0].url}
							className="now-playing__cover"
							alt=""
						/>
						<div className="now-playing__sidePanel">
							<div className="now-playing__sidePanel_Details">
								<div className="left_col">
									<div className="now-playing__name">
										<OpenSpotifyLink uri={currentTrack.uri}>
											{currentTrack.name}
											{"  "}
										</OpenSpotifyLink>
									</div>
									<div className="now-playing__artist">
										<OpenSpotifyLink uri={currentTrack.artists[0].uri}>
											{currentTrack.artists[0].name}
										</OpenSpotifyLink>
									</div>
								</div>
								<div className="right_col">
									<img
										src={spotifyIcon}
										alt="Spotify Icon"
										style={{
											width: 25,
											padding: 12.5,
											// spotify requires half of height for padding
										}}
									/>
									{isExplicit && (
										<img
											src={explicitIcon}
											alt="Explicit track warning"
											style={{
												width: 25,
												padding: 12.5,
												// spotify requires half of height for padding
											}}
										/>
									)}
								</div>
							</div>
							<TrackProgressBar
								key={key}
								duration={trackProgress.duration}
								position={trackProgress.position}
								isPaused={is_paused}
								isActive={is_active}
							/>
							<div className="btn-spotify-container">
								<button
									className="btn-spotify"
									onClick={() => {
										playerObj.previousTrack();
									}}
								>
									<i className="fas fa-backward"></i>
								</button>

								<button
									className="btn-spotify"
									onClick={() => {
										playerObj.togglePlay();
									}}
								>
									{is_paused ? (
										<i className="fas fa-play"></i>
									) : (
										<i className="fas fa-pause"></i>
									)}
								</button>
								<button
									className="btn-spotify"
									onClick={() => {
										playerObj.nextTrack();
									}}
								>
									<i className="fas fa-forward"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
				<ShuffleControls
					nextTrack={nextTrack}
					currentTrack={currentTrack}
					isPaused={is_paused}
				/>
			</>
		);
	}
}

export default WebPlayback;
