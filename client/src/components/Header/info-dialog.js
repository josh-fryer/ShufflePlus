import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export const InfoDialog = ({ openInfo, setInfoOpen }) => {
  return (
    <Dialog
      keepMounted
      open={openInfo}
      onClose={() => setInfoOpen(!openInfo)}
      fullWidth={true}
    >
      <DialogTitle>
        Info{" "}
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
          <li>ShufflePlus requires an open Spotify desktop app.</li>
          <li>
            Once logged in, select ShufflePlus in your list of devices in the
            desktop spotify app.
          </li>
          <li>
            If you want to play a different playlist/song, you may have to
            select "This Computer" in spotify devices. Then press play on the
            playlist you want and select ShufflePlus in spotify device list.
          </li>
        </ul>
        You can contact the developer on{" "}
        <a
          href="https://twitter.com/jj_fryer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        .
      </DialogContent>
    </Dialog>
  );
};
