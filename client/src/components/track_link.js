import React from "react";

const OpenSpotifyLink = ({ uri = "", children }) => {
	var splitUri = uri.split(":");

	var url = `https://open.spotify.com/${splitUri[1]}/${splitUri[2]}`;

	return (
		<a href={url} className="OpenSpotifyLink" target="_blank" rel="noreferrer">
			{children}
		</a>
	);
};

export default OpenSpotifyLink;
