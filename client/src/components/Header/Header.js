import React, { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import { InfoDialog } from "./info-dialog";
import { SettingsDialog } from "./settings-dialog";

const Header = ({ hasToken }) => {
  const [isLoggedIn, setIsloggedIn] = useState(hasToken);
  const [openInfo, setInfoOpen] = useState(false);
  const [openSettings, setSettingsOpen] = useState(false);

  useEffect(() => {
    setIsloggedIn(hasToken);
  }, [hasToken]);

  return (
    <header>
      <div className="header-wrapper">
        <div className="header-title">ShufflePlus</div>
        <div className="btns-group">
          {/* {isLoggedIn && (
            <IconButton
              sx={{
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.20)",
                },
              }}
              size="medium"
              onClick={() => setSettingsOpen(!openSettings)}
            >
              <SettingsIcon />
            </IconButton>
          )} */}
          <IconButton
            sx={{
              color: "white",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.20)",
              },
            }}
            size="medium"
            onClick={() => setInfoOpen(!openInfo)}
          >
            <i className="far fa-question-circle"></i>
          </IconButton>
        </div>
      </div>
      <SettingsDialog open={openSettings} setOpen={setSettingsOpen} />
      <InfoDialog openInfo={openInfo} setInfoOpen={setInfoOpen} />
    </header>
  );
};

export default Header;
