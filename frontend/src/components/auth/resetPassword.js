import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useResetPasswordMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice.js";
import { toast } from "react-toastify";
import { Button, TextField, Link, Grid } from "@mui/material";

const ResetPassword = ({ handleClick, id }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [resetPassword] = useResetPasswordMutation();

	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});

	const { password, confirmPassword } = formData;

	const onChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		try {
			const hasLetters = /[a-zA-Z]/;
			const hasNumbers = /\d/;
			const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

			if (!password || !confirmPassword) {
				toast.error("Please enter all fields");
				toast.clearWaitingQueue();
			} else if (password.length < 8) {
				toast.error("Password must have 8 - 20 characters");
				toast.clearWaitingQueue();
			} else if (
				!hasLetters.test(password) ||
				!hasNumbers.test(password) ||
				!hasSpecialChars.test(password)
			) {
				toast.error(
					"Password must have letters, numbers and special characters"
				);
				toast.clearWaitingQueue();
			} else if (password !== confirmPassword) {
				toast.error("Passwords don't match");
				toast.clearWaitingQueue();
			} else {
				// RESET PASSWORD
				const userData = { id, password };
				const resetRes = await resetPassword(userData).unwrap();
				if (resetRes) {
					dispatch(setCredentials({ ...resetRes }));
					navigate("/account");
				} else {
					toast.error(
						"Could not reset password. Please try again later."
					);
				}
			}
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<form onSubmit={onSubmit} noValidate>
			<TextField
				name="password"
				type="password"
				id="password"
				fullWidth
				placeholder="Password (8-20 characters)"
				inputProps={{ "aria-label": "password" }}
				autoComplete="current-password"
				onChange={onChange}
				value={password}
			/>
			<TextField
				name="confirmPassword"
				type="password"
				id="confirmPassword"
				fullWidth
				placeholder="Confirm Password"
				inputProps={{ "aria-label": "password" }}
				autoComplete="current-password"
				onChange={onChange}
				value={confirmPassword}
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 0.5, mb: 1.5 }}
			>
				Reset Password
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
						{"Cancel"}
					</Link>
				</Grid>
			</Grid>
		</form>
	);
};

export default ResetPassword;
