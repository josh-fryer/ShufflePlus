import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import XLogoBlack from "../../assets/X_logo-black.png";

export const InfoDialog = ({ openInfo, setInfoOpen }) => {
	return (
		<Dialog
			keepMounted
			open={openInfo}
			onClose={() => setInfoOpen(!openInfo)}
			fullWidth={true}
		>
			<DialogTitle>
        Help{" "}
				<IconButton
					aria-label="close"
					onClick={() => setInfoOpen(!openInfo)}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: "grey",
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<ul className="modalList">
					<li>Requires a premium Spotify subscription</li>
					<li>ShufflePlus requires an open Spotify app.</li>
					<li>
            Once logged in, select ShufflePlus in your list of devices in the
            Spotify app.
					</li>
					<li>
            You cannot seek with the track progress bar in ShufflePlus. Use your
            Spotify app to seek.
					</li>
					<li>
            To see results of the auto skipping of recently played songs, you
            will need to play music through ShufflePlus so it can build a
            history of played songs to work with. This can take a few days to a
            week to see ShufflePlus begin skipping repeated songs.
					</li>
				</ul>
				<br />
        Share feedback and suggestions at{" "}
				<a
					href="https://twitter.com/jj_fryer"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={XLogoBlack}
						alt="X Logo"
						style={{
							height: 18,
						}}
					/>
				</a>
			</DialogContent>
		</Dialog>
	);
};
