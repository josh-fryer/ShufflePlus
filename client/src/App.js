import { useContext } from "react";
import WebPlayback from "./WebPlayback";
import Login from "./Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import GetPremium from "./getSpotifyPremium";
import { Switch, Route } from "react-router-dom";
import "./style/App.css";
import { UserContext } from "../src/services/UserContext";

// var spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
// var spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const App = () => {
	const context = useContext(UserContext);
	return (
		<>
			<Header hasToken={context.token == "" ? false : true} />
			<Switch>
				<Route path="/getpremium">
					{/* on login error because account is free, redirect to page where user can get spotify premium. ths follows requirements of spotify guidlines */}
					<GetPremium />
				</Route>
				<Route path="/">
					{context.token === "" ? (
						<Login />
					) : (
						<>
							<WebPlayback />
						</>
					)}
				</Route>
			</Switch>
			<Footer />
		</>
	);
};

export default App;
