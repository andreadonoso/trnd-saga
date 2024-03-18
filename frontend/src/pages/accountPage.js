import { useNavigate } from "react-router-dom";
import { IconButton, Button, Box, CssBaseline } from "@mui/material/";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
// import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";

const AccountPage = ({ colorMode }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const [logout] = useLogoutMutation();

	// useEffect(() => {
	// 	// If is logged out, redirect
	// 	if (!user) navigate("/");
	// 	dispatch(reset());
	// }, [user, dispatch, navigate]);

	const logoutHandler = async () => {
		try {
			// request to destroy cookie
			await logout().unwrap();

			// clear local storage
			dispatch(clearCredentials());

			navigate("/");
			// dispatch(reset());
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Box>
			<CssBaseline />
			<IconButton onClick={colorMode}>
				{theme.palette.mode === "dark" ? (
					<Brightness7Icon />
				) : (
					<Brightness4Icon />
				)}
			</IconButton>
			Account Page! Hello {user ? user.username : null}
			<Button onClick={logoutHandler}>Log out</Button>
		</Box>
	);
};

export default AccountPage;
