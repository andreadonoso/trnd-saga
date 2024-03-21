import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	useLoginMutation,
	useSendEmailMutation,
} from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Link, Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FacebookCircularProgress from "../facebookCircularProgress";

const Login = ({ handleClick }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();
	const [sendEmail] = useSendEmailMutation();
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (user) {
			toast.dismiss();
			navigate("/account");
		}
		toast.clearWaitingQueue();
	}, [user, navigate]);

	const [formData, setFormData] = useState({
		credential: "",
		password: "",
	});
	const { credential, password } = formData;

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const usernameRegex = /^[a-zA-Z0-9_.]+$/;
	const cleanCredential = credential.toLowerCase().trim();

	const onChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		try {
			if (
				emailRegex.test(cleanCredential) ||
				usernameRegex.test(cleanCredential)
			) {
				// LOGIN
				const userData = { credential: cleanCredential, password };
				const loginRes = await login(userData).unwrap();
				if (loginRes.emailVerified) {
					dispatch(setCredentials({ ...loginRes }));
					navigate("/account");
				} else {
					const emailRes = await sendEmail({
						credential: cleanCredential,
					}).unwrap();

					if (emailRes) {
						handleClick(
							"Email Verification",
							cleanCredential,
							"li"
						);
					} else {
						toast.error(
							"Failed to send email. Please try again later."
						);
					}
				}
			} else {
				toast.error("Invalid username or email");
				toast.clearWaitingQueue();
			}
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<form onSubmit={onSubmit} noValidate>
			<TextField
				name="credential"
				type="text"
				id="credential"
				fullWidth
				placeholder="Username or email"
				inputProps={{ "aria-label": "credential" }}
				autoComplete="username"
				onChange={onChange}
				value={credential}
			/>
			<TextField
				name="password"
				type="password"
				id="password"
				fullWidth
				placeholder="Password"
				inputProps={{ "aria-label": "password" }}
				autoComplete="current-password"
				onChange={onChange}
				value={password}
			/>
			<LoadingButton
				type="submit"
				disabled={!cleanCredential || !password || isLoading}
				fullWidth
				variant="contained"
				sx={{ mt: 1, mb: 1.5 }}
				loading={isLoading}
				loadingIndicator={<FacebookCircularProgress />}
			>
				<span>Log In</span>
			</LoadingButton>
			<Grid container>
				<Grid item xs>
					<Link
						onClick={() => {
							handleClick("Forgot Password?");
						}}
						variant="body2"
						underline="hover"
						color="secondary"
					>
						{"Forgot password?"}
					</Link>
				</Grid>
				<Grid item>
					<Link
						onClick={() => {
							handleClick("Sign Up");
						}}
						variant="body2"
						underline="hover"
						color="secondary"
					>
						{"Create an account"}
					</Link>
				</Grid>
			</Grid>
		</form>
	);
};

export default Login;
