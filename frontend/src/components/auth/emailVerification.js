import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	useSendEmailMutation,
	useVerifyEmailMutation,
} from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Grid,
	Link,
	Typography,
	Box,
	FormHelperText,
	CircularProgress,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { MuiOtpInput } from "mui-one-time-password-input";

const EmailVerification = ({ handleClick, credential, option }) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [sendEmail] = useSendEmailMutation();
	const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
	const [isVerifying, setIsVerifying] = useState(false);
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (user) {
			toast.dismiss();
			navigate("/account");
		}
		toast.clearWaitingQueue();
	}, [user, navigate]);

	const [otp, setOtp] = useState("");
	const [isValid, setIsValid] = useState(true);

	const handleChange = (newValue) => {
		setIsValid(true);
		setOtp(newValue);
	};

	const handleFocus = (event) => {
		event.target.setSelectionRange(otp.length, otp.length);
	};

	const validateChar = (value, index) => {
		return /^\d$/.test(value);
	};

	const handleComplete = async (finalValue) => {
		if (isVerifying) return;
		setIsVerifying(true);

		try {
			// VERIFY EMAIL
			document.activeElement.blur();
			const userData = { credential, code: finalValue };
			const res = await verifyEmail(userData).unwrap();
			if (res.emailVerified && option === "li") {
				setOtp("");
				dispatch(setCredentials({ ...res }));
				navigate("/account");
			} else if (res && option === "rp") {
				setOtp("");
				handleClick("Reset Password", res._id);
			}
		} catch (err) {
			if (err?.data?.message !== "Incorrect verification code") {
				toast.error(err?.data?.message || err.error);
				return;
			} else {
				setOtp("");
				setIsValid(false);
				return;
			}
		} finally {
			setIsVerifying(false);
			return;
		}
	};

	return (
		<form noValidate>
			<Box
				sx={{
					height: "90px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				{isLoading ? (
					<CircularProgress
						color="secondary"
						size={30}
						sx={{ mt: 2 }}
					/>
				) : (
					<>
						<MuiOtpInput
							autoFocus
							value={otp}
							length={6}
							onChange={handleChange}
							onFocus={handleFocus}
							validateChar={validateChar}
							onComplete={handleComplete}
							TextFieldsProps={{ type: "tel" }}
							sx={{
								gap: "5px",
								mb: 0.5,
								display: "flex",
								justifyContent: "center",
								"& .MuiInputBase-input": {
									width: "13px",
									height: "13px",
								},
								"& .MuiInputBase-root": {
									borderColor: !isValid
										? theme.palette.error.main
										: "primary",
								},
							}}
						/>
						{!isValid && (
							<FormHelperText
								sx={{
									display: "flex",
									alignItems: "center",
									lineHeight: "inherit",
									color: theme.palette.error.main,
								}}
							>
								<ErrorOutlineIcon
									fontSize="inherit"
									sx={{
										marginRight: "4px",
										color: theme.palette.error.main,
									}}
								/>
								Incorrect verification code
							</FormHelperText>
						)}
					</>
				)}
			</Box>
			<Box justifyContent="center">
				<Typography align="center" sx={{ mb: 3 }} variant="body1">
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
