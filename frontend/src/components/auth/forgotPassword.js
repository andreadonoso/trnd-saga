import * as React from "react";
import { useState } from "react";
import { useSendEmailMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField, Link, Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FacebookCircularProgress from "../facebookCircularProgress";

const ForgotPassword = ({ handleClick }) => {
	const [sendEmail, { isLoading }] = useSendEmailMutation();
	const [formData, setFormData] = useState({ credential: "" });
	const { credential } = formData;

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
				// FORGOT PASSWORD
				const userData = { credential: cleanCredential };
				const emailRes = await sendEmail(userData).unwrap();

				if (emailRes) {
					handleClick("Email Verification", cleanCredential, "rp");
				} else {
					toast.error(
						"Failed to send email. Please try again later."
					);
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
				autoComplete="email"
				onChange={onChange}
				value={credential}
			/>
			<LoadingButton
				type="submit"
				disabled={isLoading || !cleanCredential}
				fullWidth
				variant="contained"
				sx={{ mt: 1, mb: 1.5 }}
				loading={isLoading}
				loadingIndicator={<FacebookCircularProgress />}
			>
				<span>Send Email</span>
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
						{"Back to log in"}
					</Link>
				</Grid>
			</Grid>
		</form>
	);
};

export default ForgotPassword;
