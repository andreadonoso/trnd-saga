import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
	const res = await axios.post(API_URL + "register", userData);
	return res.data;
};

// Login user
const login = async (userData) => {
	const res = await axios.post(API_URL + "login", userData);

	if (res.data.emailVerified) {
		localStorage.setItem("user", JSON.stringify(res.data));
	}

	return res.data;
};

// Logout user
const logout = () => {
	localStorage.removeItem("user");
};

// Send reset password email
const sendEmail = async (userData) => {
	const res = await axios.post(API_URL + "sendEmail", userData);
	return res.data;
};

// Verify email
const verifyEmail = async (userData) => {
	const res = await axios.post(API_URL + "verifyEmail", userData);

	if (res.data.emailVerified) {
		localStorage.setItem("user", JSON.stringify(res.data));
	}

	return res.data;
};

const authService = {
	register,
	login,
	logout,
	sendEmail,
	verifyEmail,
};

export default authService;
