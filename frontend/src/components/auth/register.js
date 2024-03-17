import * as React from "react";
import { useState } from "react";
import {
	useRegisterMutation,
	useSendEmailMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField, Link, Grid } from "@mui/material";

const Register = ({ handleClick }) => {
	const [register, { isLoading }] = useRegisterMutation();
	const [sendEmail] = useSendEmailMutation();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { email, password, confirmPassword } = formData;

	const onChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		try {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			const hasLetters = /[a-zA-Z]/;
			const hasNumbers = /\d/;
			const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
			const cleanEmail = email.toLowerCase().trim();

			if (!cleanEmail || !password || !confirmPassword) {
				toast.error("Please enter all fields");
				toast.clearWaitingQueue();
			} else if (!emailRegex.test(cleanEmail)) {
				toast.error("Enter a valid email");
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
				// REGISTER
				const userData = { email: cleanEmail, password };
				await register(userData).unwrap();
				sendEmail({ credential: cleanEmail }).unwrap();
				handleClick("Email Verification", cleanEmail);
			}
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<form onSubmit={onSubmit} noValidate>
			<TextField
				name="email"
				type="text"
				id="email"
				fullWidth
				placeholder="Email"
				inputProps={{ "aria-label": "email" }}
				autoComplete="email"
				onChange={onChange}
				value={email}
			/>
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
				Sign Up
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
						{"Already have an account?"}
					</Link>
				</Grid>
			</Grid>
		</form>
	);
};

export default Register;
