import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	verifyEmail,
	sendEmail,
	reset,
} from "../../features/auth/authSlice.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid, Link, Typography, Box } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";

const EmailVerification = ({ handleClick, credential }) => {
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// CHANGE EMAIL TO CREDENTIAL
	useEffect(() => {
		if (isError) toast.error(message);

		if (isSuccess && user.emailVerified) {
			toast.dismiss();
			setTimeout(() => {
				navigate("/account");
			}, 400);
		} else if (isSuccess && !user.emailVerified) {
			toast.dismiss();
			const userData = { credential };
			setTimeout(() => {
				dispatch(sendEmail(userData));
				toast.success("Email sent! Please check your inbox");
			}, 400);
		}
		toast.clearWaitingQueue();

		dispatch(reset());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, isError, isSuccess, isLoading, message, navigate, dispatch]);

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
		const userData = { credential, code: finalValue };
		dispatch(verifyEmail(userData));
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
							const userData = { credential };
							dispatch(sendEmail(userData));
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
