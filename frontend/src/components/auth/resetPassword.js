import * as React from "react";
import { Button } from "@mui/material";

const ResetPassword = ({ handleClick, email }) => {
	return (
		<Button
			type="submit"
			fullWidth
			variant="contained"
			sx={{ mt: 1.2, mb: 1.5 }}
		>
			Reset Password
		</Button>
	);
};

export default ResetPassword;
