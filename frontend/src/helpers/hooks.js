import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function getWindowDimensions() {
	const { innerHeight: height } = window;
	return height;
}

export function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);
	const location = useLocation();

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [location]);

	return windowDimensions;
}
