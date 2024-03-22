import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useResetPasswordMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice.js";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import { TextField, Link, Grid, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FacebookCircularProgress from "../facebookCircularProgress";

const ResetPassword = ({ handleClick, id }) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [resetPassword, { isLoading }] = useResetPasswordMutation();

	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});
	const { password, confirmPassword } = formData;

	const hasLetters = /[a-zA-Z]/;
	const hasNumbers = /\d/;
	const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
	const lengthReq = password.length > 7 && password.length < 21;
	const charReq =
		hasLetters.test(password) &&
		hasNumbers.test(password) &&
		hasSpecialChars.test(password);

	// Validation for password textfield
	const [isFocusedP, setIsFocusedP] = useState(false);
	const onBlurP = () => setIsFocusedP(false);
	const onFocusP = () => setIsFocusedP(true);

	// Validation for confirm password textfield
	const [isFocusedCP, setIsFocusedCP] = useState(false);
	const onBlurCP = () => setIsFocusedCP(false);
	const onFocusCP = () => setIsFocusedCP(true);

	const onChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		try {
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
				onBlur={onBlurCP}
				onFocus={onFocusCP}
				helperText={
					!isFocusedCP &&
					confirmPassword !== password &&
					confirmPassword.length > 0 ? (
						<Typography
							color={theme.palette.error.main}
							component={"span"}
						>
							Passwords don't match
						</Typography>
					) : null
				}
				sx={{
					"& .MuiInputBase-root": {
						borderColor:
							!isFocusedCP &&
							confirmPassword !== password &&
							confirmPassword.length > 0
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
					!confirmPassword ||
					!password ||
					!lengthReq ||
					!charReq ||
					confirmPassword !== password
				}
				fullWidth
				variant="contained"
				sx={{ mt: 1, mb: 1.5 }}
				loading={isLoading}
				loadingIndicator={<FacebookCircularProgress />}
			>
				<span>Reset Password</span>
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
						{"Cancel"}
					</Link>
				</Grid>
			</Grid>
		</form>
	);
};

export default ResetPassword;
