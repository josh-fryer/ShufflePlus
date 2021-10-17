import React, { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="title">ShufflePlus</div>
        <IconButton
          sx={{
            color: "white",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.20)",
            },
          }}
          size="medium"
          onClick={() => setOpen(!open)}
        >
          <i className="far fa-question-circle"></i>
        </IconButton>
      </div>

      <Dialog
        keepMounted
        open={open}
        onClose={() => setOpen(!open)}
        fullWidth={true}
      >
        <DialogTitle>
          Info{" "}
          <IconButton
            aria-label="close"
            onClick={() => setOpen(!open)}
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
    </header>
  );
};

export default Header;
