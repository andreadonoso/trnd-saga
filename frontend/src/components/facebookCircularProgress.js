import {
	Box,
	CircularProgress,
	circularProgressClasses,
	CircularProgressProps,
} from "@mui/material";

function FacebookCircularProgress(props: CircularProgressProps) {
	return (
		<Box
			sx={{
				position: "relative",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<CircularProgress
				variant="determinate"
				sx={{
					color: (theme) =>
						theme.palette.mode === "light" ? "grey" : "grey",
				}}
				size={20}
				thickness={6}
				{...props}
				value={100}
			/>
			<CircularProgress
				variant="indeterminate"
				disableShrink
				sx={{
					color: (theme) =>
						theme.palette.mode === "light" ? "#ffffff" : "#000000",
					animationDuration: "550ms",
					position: "absolute",
					left: 0,
					[`& .${circularProgressClasses.circle}`]: {
						strokeLinecap: "round",
					},
				}}
				size={20}
				thickness={6}
				{...props}
			/>
		</Box>
	);
}

export default FacebookCircularProgress;
