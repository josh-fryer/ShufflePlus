import KoFi from "./KoFi";
import logo from "../assets/Spotify_Logo_RGB_Green.png";

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer-wrapper">
				<div style={{ padding: 10 }}>Made by Josh Fryer.</div>
				<KoFi color="#29abe0" id="L3L7R7WE" label="Buy me a coffee" />
				<a
					className="twitter-link"
					href="https://twitter.com/jj_fryer"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span style={{ padding: 12 }}>
						<i className="fa-brands fa-x-twitter fa-xl"></i>						
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
            Spotify API and Player SDK
				</a>
				<img
					src={logo}
					alt="Spotify Logo"
					style={{
						height: 32,
						padding: 16,
						// spotify requires half of height for padding
					}}
				/>
			</div>
		</div>
	);
};

export default Footer;
