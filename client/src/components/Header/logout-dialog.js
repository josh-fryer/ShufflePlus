import { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const LogoutDialog = ({ open, setOpen, logout }) => {
	useEffect(() => {
		return () => {
			setOpen(false);
		};
	}, []);

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
          Logout of ShufflePlus, also logs you out of Spotify Web-Player.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					variant="outlined"
					color="success"
					onClick={async () => {
						await logout();
						window.location = "/";
					}}
				>
          YES
				</Button>
				<Button color="error" variant="outlined" onClick={() => setOpen(false)}>
          NO
				</Button>
			</DialogActions>
		</Dialog>
	);
};
