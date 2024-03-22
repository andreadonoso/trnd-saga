import { useNavigate } from "react-router-dom";
// import { useEffect } from "react"
import { IconButton, Button, Box, CssBaseline, Fade } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
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
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Fade in={true} timeout={500}>
			<Box>
				<CssBaseline />
				Mode:
				<IconButton onClick={colorMode} sx={{ ml: 2 }}>
					{theme.palette.mode === "dark" ? (
						<Brightness7Icon />
					) : (
						<Brightness4Icon />
					)}
				</IconButton>
				<br /> Hello {user ? user.username : null}! <br />
				<Button
					onClick={logoutHandler}
					variant="contained"
					sx={{ mt: 2 }}
				>
					Log out
				</Button>
			</Box>
		</Fade>
	);
};

export default AccountPage;
