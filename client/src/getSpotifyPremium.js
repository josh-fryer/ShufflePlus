import React from "react";

const GetPremium = () => (
	<div className="App">
		<div className="login-container">
			<div className="login-header">Get Spotify Premium</div>

			<div className="login-content">
				<p>
					<span className="subheading">
            Failed to enter ShufflePlus because you are not a Premium user
					</span>
					<br />
					<br />
          ShufflePlus has features that require a Spotify Premium account to
          function.
					<br />
          Please upgrade your Spotify account to Spotify Premium to use
          ShufflePlus.
				</p>
			</div>

			<a className="btn-login" href="https://spotify.com/premium">
        Spotify.com/premium
			</a>
		</div>
	</div>
);

export default GetPremium;
