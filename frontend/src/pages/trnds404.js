import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Container, CssBaseline, Box, Typography, Fade } from "@mui/material";
import { useWindowDimensions } from "../helpers/hooks";

import black404 from "../assets/black404.png";
import white404 from "../assets/white404.png";

const Trnds404 = () => {
	const theme = useTheme();
	const height = useWindowDimensions();
	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: { height },
				}}
			>
				<CssBaseline />
				<img
					src={theme.palette.mode === "light" ? black404 : white404}
					alt="Logo"
					width="70%"
				/>
				<Typography variant="p" sx={{ mt: 5 }}>
					Sorry, we can't find the page you are looking for
				</Typography>
			</Box>
		</Container>
	);
};

export default Trnds404;
