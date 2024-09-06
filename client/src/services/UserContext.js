import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	const [token, setToken] = useState("");

	const getToken = async () => {
		return await fetch("/auth/token", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setToken(data.access_token);
				return data;
			})
			.catch((err) =>
				console.log("error getting token in context getToken:", err),
			);
	};

	const refreshToken = async () => {
		return await fetch("/auth/new-token", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Set new token in server. Data: ", data);
				setToken(data.access_token);
				return data;
			})
			.catch((err) =>
				console.log("error getting new token in context refreshToken: ", err),
			);
	};

	const logout = () => {
		fetch("/auth/logout").catch((err) => console.log(err));
		setToken("");
		// remove tokens in server
	};
	useEffect(() => {
		// get token at start
		getToken();
	}, []);

	return (
		<UserContext.Provider
			value={{
				token,
				refreshToken,
				getToken,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
