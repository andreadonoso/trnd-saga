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
import { Grid, Link, Typography, Box } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";

const EmailVerification = ({ handleClick }) => {
	const { email, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) toast.error(message);

		// If success user247264894527
		// if (user) {
		// 	toast.dismiss();
		// 	setTimeout(() => {
		// 		// handleClick("Reset Password");
		// 		toast.success("Email sent! Please check your inbox");
		// 	}, 400);
		// }

		if (isSuccess) {
			toast.dismiss();
			setTimeout(() => {
				// handleClick("Reset Password");
				toast.success("Email sent! Please check your inbox");
			}, 400);
		}
		toast.clearWaitingQueue();

		dispatch(reset());
		// eslint - disable - next - line;
	}, [email, isError, isSuccess, isLoading, message, navigate, dispatch]);

	const [otp, setOtp] = useState("");

	const handleChange = (newValue) => {
		setOtp(newValue);
	};

	function matchIsString(text) {
		return typeof text === "string";
	}

	function matchIsNumeric(text) {
		const isNumber = typeof text === "number";
		const isString = matchIsString(text);
		return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
	}

	const validateChar = (value, index) => {
		return matchIsNumeric(value);
	};

	const handleComplete = (finalValue) => {
		alert(finalValue);
	};

	return (
		<form noValidate>
			<MuiOtpInput
				value={otp}
				length={6}
				onChange={handleChange}
				validateChar={validateChar}
				onComplete={handleComplete}
				sx={{ gap: "6px", mb: 2 }}
				autoFocus
			/>
			<Box justifyContent="center">
				<Typography
					align="center"
					sx={{ mt: 2, mb: 3 }}
					variant="body1"
				>
					A verification code has been sent to your email. Please make
					sure to check your spam folder.
				</Typography>
			</Box>
			<Grid container justifyContent="center">
				<Grid item>
					<Link
						onClick={() => {
							const userData = {
								credential: localStorage
									.getItem("email")
									.toString(),
							};
							dispatch(sendResetPasswordEmail(userData));
						}}
						variant="body2"
						underline="hover"
						color="secondary"
					>
						{"Didn't get a verification code?"}
					</Link>
				</Grid>
			</Grid>
		</form>
	);
};

export default EmailVerification;
