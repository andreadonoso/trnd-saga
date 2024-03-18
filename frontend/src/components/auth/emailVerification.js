import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	useSendEmailMutation,
	useVerifyEmailMutation,
} from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid, Link, Typography, Box } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";

const EmailVerification = ({ handleClick, credential, option }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [sendEmail] = useSendEmailMutation();
	const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (user) {
			toast.dismiss();
			navigate("/account");
		}
		toast.clearWaitingQueue();
	}, [user, navigate]);

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

	const handleComplete = async (finalValue) => {
		try {
			// VERIFY EMAIL
			const userData = { credential, code: finalValue };
			const res = await verifyEmail(userData).unwrap();
			if (res.emailVerified && option === "li") {
				dispatch(setCredentials({ ...res }));
				navigate("/account");
			} else if (res && option === "rp") {
				handleClick("Reset Password", res._id);
			}
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<form noValidate>
			<MuiOtpInput
				value={otp}
				length={6}
				onChange={handleChange}
				validateChar={validateChar}
				onComplete={handleComplete}
				sx={{
					gap: "5px",
					mb: 2,
					display: "flex",
					justifyContent: "center",
					"& .MuiInputBase-input": {
						width: "13px",
						height: "13px",
					},
				}}
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
						onClick={async () => {
							const userData = { credential };
							try {
								const res = await sendEmail(userData);
								if (res.error) {
									toast.error(res.error.message);
								} else {
									toast.success(
										"Email sent! Please check your inbox"
									);
								}
							} catch (error) {
								toast.error(
									"Failed to send email. Please try again later."
								);
							}
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
