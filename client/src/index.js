import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./style/index.css";
import { UserContextProvider } from "./services/UserContext";

ReactDOM.render(
	<StrictMode>
		<UserContextProvider>
			<Router>
				<App />
			</Router>
		</UserContextProvider>
	</StrictMode>,
	document.getElementById("root")
);
