import React, { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const Header = () => {
  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="title">ShufflePlus</div>
        <a className="header-icon">
          <i className="far fa-question-circle"></i>
        </a>
      </div>
    </header>
  );
};

export default Header;
