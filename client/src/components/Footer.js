import React from "react";
import KoFi from "./KoFi";
import logo from "../assets/Spotify_Logo_RGB_Green.png";

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer-wrapper">
				<div style={{ padding: 10 }}>Made by Josh Fryer.</div>
				<KoFi color="#29abe0" id="L3L7R7WE" label="Support this site" />
				<a
					className="twitter-link"
					href="https://twitter.com/jj_fryer"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span className="fa-stack fa-2x" style={{ padding: 10 }}>
						<i className="fas fa-circle fa-stack-2x"></i>
						<i className="twitter-bird fab fa-twitter fa-stack-1x fa-inverse"></i>
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
          Uses Spotify API and Player SDK
				</a>
				<img
					src={logo}
					alt="Spotify Logo"
					style={{
						height: 42,
						padding: 21,
						// spotify requires half of height for padding
					}}
				/>
			</div>
		</div>
	);
};

export default Footer;
