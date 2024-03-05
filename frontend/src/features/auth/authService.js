import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
	const res = await axios.post(API_URL + "register", userData);

	if (res.data) {
		localStorage.setItem("user", JSON.stringify(res.data));
	}

	return res.data;
};

// Login user
const login = async (userData) => {
	const res = await axios.post(API_URL + "login", userData);

	if (res.data) {
		localStorage.setItem("user", JSON.stringify(res.data));
	}

	return res.data;
};

// Logout user
const logout = () => {
	localStorage.removeItem("user");
};

// Send reset password email
const sendResetPasswordEmail = async (userData) => {
	const res = await axios.post(API_URL + "sendResetPasswordEmail", userData);
	return res.data;
};

const authService = {
	register,
	login,
	logout,
	sendResetPasswordEmail,
};

export default authService;
