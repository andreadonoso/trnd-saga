import { Typography, Link } from "@mui/material";

function About(props) {
	return (
		<Typography
			variant="body1"
			underline="hover"
			color="secondary"
			align="center"
		>
			{"About "}
			<Link color="inherit" href="https://mui.com/">
				trnds
			</Link>
		</Typography>
	);
}

export default About;
