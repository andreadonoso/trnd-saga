import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	sendResetPasswordEmail,
	reset,
} from "../../features/auth/authSlice.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField, Link, Grid } from "@mui/material";

const ResetPassword = ({ handleClick }) => {
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({ credential: "" });
	const { credential } = formData;

	useEffect(() => {
		if (isError) toast.error(message);

		// If success or the user is already logged in
		if (isSuccess) {
			toast.dismiss();
			setTimeout(() => {
				handleClick("Log In");
				toast.success("Email sent! Please check your email");
			}, 400);
		}
		toast.clearWaitingQueue();

		dispatch(reset());
		// eslint-disable-next-line
	}, [user, isError, isSuccess, isLoading, message, navigate, dispatch]);

	const onChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const onSubmit = (event) => {
		event.preventDefault();

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const usernameRegex = /^[a-zA-Z0-9_.]+$/;

		if (!credential) {
			toast.error("Please enter all fields");
			toast.clearWaitingQueue();
		} else if (
			emailRegex.test(credential.trim()) ||
			usernameRegex.test(credential.trim())
		) {
			const userData = { credential: credential.toLowerCase().trim() };
			dispatch(sendResetPasswordEmail(userData));
		} else {
			toast.error("Invalid username or email");
			toast.clearWaitingQueue();
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
				autoComplete="email"
				onChange={onChange}
				value={credential}
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 1.2, mb: 1.5 }}
			>
				Send Email
			</Button>
			<Grid container justifyContent="center">
				<Grid item>
					<Link
						onClick={() => {
							handleClick("Log In");
						}}
						variant="body2"
						underline="hover"
						color="secondary"
					>
						{"Back to log in"}
					</Link>
				</Grid>
			</Grid>
		</form>
	);
};

export default ResetPassword;
