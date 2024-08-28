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
	const [tokenTimeStarted, setTokenTimeStarted] = useState(0);
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
	// eslint-disable-next-line no-unused-vars
	const [avgBgColour, setAvgBgColour] = useState({r:46,g:46,b:46});

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: "ShufflePlus Player",
				getOAuthToken: async (cb) => {
					console.log("GET TOKEN cb");
					let accessToken = await context.getToken();
					
					if (!accessToken) {
						console.error("Token could not be fetched");
						return;
					}
					
					let d = new Date().getTime();
					if (tokenTimeStarted > 0) {
						// compare time. if over 30 mins, refresh token
						if (d > (tokenTimeStarted + 30 * 60000)) {
							setTokenTimeStarted(d);
							// token has expired. get new token:
							console.log("Retrieving new token.");
							accessToken = await context.refreshToken();
						}
					} else {
						setTokenTimeStarted(d);
					}
					
					console.log("new token sending to Spotify Player: "+ accessToken);
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
					!state ? setActive(false) : setActive(true);
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
				data.explicit ? setIsExplicit(true) : setIsExplicit(false);
			})
			.catch((err) => console.log("fetch track error: ", err));

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
		padding: 0
	};

	if (!is_active) {
		return (
			<>
				<div className="container">
					<div className="main-wrapper">
						<b>
							{" "}
              Transfer your playback to ShufflePlus from the device list in the
              Spotify app.
						</b>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div
					style={ playerContainerStyle }
				>
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
											padding: 12.5
											// spotify requires half of height for padding
										}}
									/>
									{isExplicit && (
										<img
											src={explicitIcon}
											alt="Explicit track warning"
											style={{
												width: 25,
												padding: 12.5
												// spotify requires half of height for padding
											}}
										/>
									)}
								</div>				

							</div>
							<TrackProgressBar
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
