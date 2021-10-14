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
        <a className="header-icon" onClick={() => setOpen(!open)}>
          <i className="far fa-question-circle"></i>
        </a>
      </div>
      <Dialog open={open} onClose={() => setOpen(!open)}>
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
        <DialogContent>TEXT HERE</DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
