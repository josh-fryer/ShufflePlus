import React from "react";
import KoFi from "./KoFi";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-wrapper">
        <div>Made by Josh Fryer.</div>
        <KoFi color="#29abe0" id="L3L7R7WE" label="Support this site" />
        <a
          className="twitter-link"
          href="https://twitter.com/jj_fryer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="fa-stack fa-2x">
            <i className="fas fa-circle fa-stack-2x"></i>
            <i className="black fab fa-twitter fa-stack-1x fa-inverse"></i>
          </span>
        </a>
        <a
          className="github-btn"
          href="https://github.com/josh-fryer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          className="spotifyLink"
          href="https://developer.spotify.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Uses Spotify Api and player SDK
        </a>
      </div>
    </div>
  );
};

export default Footer;
