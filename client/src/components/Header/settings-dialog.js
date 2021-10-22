import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export const SettingsDialog = ({ open, setOpen }) => {
  return (
    <Dialog
      keepMounted
      open={open}
      onClose={() => setOpen(!open)}
      fullWidth={true}
    >
      <DialogTitle>
        Settings{" "}
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
        <ul>
          <li></li>
        </ul>
      </DialogContent>
    </Dialog>
  );
};
