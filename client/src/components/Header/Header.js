import React, { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
// import SettingsIcon from "@mui/icons-material/Settings";
import { InfoDialog } from "./info-dialog";
import { SettingsDialog } from "./settings-dialog";
import { LogoutDialog } from "./logout-dialog";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { UserContext } from "../../services/UserContext";

const Header = () => {
	const context = useContext(UserContext);
	const [openInfo, setInfoOpen] = useState(false);
	const [openLogout, setLogoutOpen] = useState(false);
	const [openSettings, setSettingsOpen] = useState(false);

	return (
		<header>
			<div className="header-wrapper">
				<div className="header-title">
					<Link to="/">ShufflePlus</Link>
				</div>
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
					{context.token !== "" && (
						<Button
							variant="outlined"
							sx={{
								color: "white",
								borderColor: "#626262",
								fontSize: 12,
								"&:hover": {
									borderColor: "white",
								},
							}}
							onClick={() => {
								setLogoutOpen(true);
							}}
						>
              Logout
						</Button>
					)}
				</div>
			</div>
			{/* TO DO: Settings. (probably not needed anymore)*/}
			<SettingsDialog open={openSettings} setOpen={setSettingsOpen} />
			<InfoDialog openInfo={openInfo} setInfoOpen={setInfoOpen} />
			<LogoutDialog
				open={openLogout}
				setOpen={setLogoutOpen}
				logout={context.logout}
			/>
		</header>
	);
};

export default Header;
