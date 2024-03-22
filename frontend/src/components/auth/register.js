import * as React from "react";
import { useState } from "react";
import {
	useRegisterMutation,
	useSendEmailMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material/styles";
import { TextField, Link, Grid, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FacebookCircularProgress from "../facebookCircularProgress";

const Register = ({ handleClick }) => {
	const theme = useTheme();
	const [register, { isLoading }] = useRegisterMutation();
	const [sendEmail] = useSendEmailMutation();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const hasLetters = /[a-zA-Z]/;
	const hasNumbers = /\d/;
	const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
	const cleanEmail = email.toLowerCase().trim();
	const lengthReq = password.length > 7 && password.length < 21;
	const charReq =
		hasLetters.test(password) &&
		hasNumbers.test(password) &&
		hasSpecialChars.test(password);

	// Validation for email textfield
	const [isFocusedE, setIsFocusedE] = useState(false);
	const onBlurE = () => setIsFocusedE(false);
	const onFocusE = () => setIsFocusedE(true);

	// Validation for password textfield
	const [isFocusedP, setIsFocusedP] = useState(false);
	const onBlurP = () => setIsFocusedP(false);
	const onFocusP = () => setIsFocusedP(true);

	const onChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		try {
			// REGISTER
			const userData = { email: cleanEmail, password };
			const registerRes = await register(userData).unwrap();
			if (registerRes) {
				const emailRes = await sendEmail({
					credential: cleanEmail,
				}).unwrap();

				if (emailRes) {
					handleClick("Email Verification", cleanEmail, "li");
				} else {
					toast.error(
						"Failed to send email. Please try again later."
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
				name="email"
				type="text"
				id="email"
				fullWidth
				placeholder="Email"
				inputProps={{ "aria-label": "email" }}
				autoComplete="email"
				onChange={onChange}
				value={email}
				onBlur={onBlurE}
				onFocus={onFocusE}
				helperText={
					!isFocusedE &&
					!emailRegex.test(cleanEmail) &&
					email.length > 0 ? (
						<Typography
							color={theme.palette.error.main}
							component={"span"}
						>
							Please enter a valid email
						</Typography>
					) : null
				}
				sx={{
					"& .MuiInputBase-root": {
						borderColor:
							!isFocusedE &&
							!emailRegex.test(cleanEmail) &&
							email.length > 0
								? theme.palette.error.main
								: "primary",
					},
					mt: 1,
				}}
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
				onBlur={onBlurP}
				onFocus={onFocusP}
				helperText={
					password.length > 0 ? (
						<Typography color="primary" component={"span"}>
							Your password must have: <br />
							<Typography
								component={"span"}
								ml={1}
								color={
									lengthReq
										? theme.palette.success.main
										: !isFocusedP &&
										  !lengthReq &&
										  password.length > 0
										? theme.palette.error.main
										: "grey"
								}
							>
								✓ 8-20 characters <br />
							</Typography>
							<Typography
								component={"span"}
								ml={1}
								color={
									charReq
										? theme.palette.success.main
										: !isFocusedP &&
										  !charReq &&
										  password.length > 0
										? theme.palette.error.main
										: "grey"
								}
							>
								✓ Letters, numbers, and special characters
							</Typography>
						</Typography>
					) : null
				}
				sx={{
					"& .MuiInputBase-root": {
						borderColor:
							!isFocusedP &&
							(!lengthReq || !charReq) &&
							password.length > 0
								? theme.palette.error.main
								: "primary",
					},
					mt: 1,
				}}
			/>
			<LoadingButton
				type="submit"
				disabled={
					isLoading ||
					!cleanEmail ||
					!emailRegex.test(cleanEmail) ||
					!password ||
					!lengthReq ||
					!charReq
				}
				fullWidth
				variant="contained"
				sx={{ mt: 1, mb: 1.5 }}
				loading={isLoading}
				loadingIndicator={<FacebookCircularProgress />}
			>
				<span>Sign Up</span>
			</LoadingButton>
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
