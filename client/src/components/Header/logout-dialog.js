import React, { useEffect } from "react";
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
          In order to logout of ShufflePlus, you need to log out of Spotify
          Web-Player. You will be redirected to Spotify to confirm.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="success"
          onClick={async () => {
            await logout();
            window.location = "https://www.spotify.com/logout/";
          }}
          autoFocus
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
