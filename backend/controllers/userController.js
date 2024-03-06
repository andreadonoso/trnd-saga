require("dotenv").config();
const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// @desc    Get all users
// @route   GET /api/users/
// @access  Private
const getUsers = async (req, res) => {
	const users = await User.find({}).sort({ createdAT: -1 });
	res.status(200).json(users);
};

// @desc    Get a single user
// @route   GET /api/users/:id
// @access  Private
const getUser = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "The user does not exist." });
	}

	const user = await User.findById(id);

	if (!user) {
		return res.status(404).json({ error: "The user does not exist." });
	}

	res.status(200).json(user);
});

// @desc    Register a user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Check all fields exist
	if (!email || !password) {
		res.status(400);
		throw new Error("Please enter all fields");
	} else {
		// Check if user already exists
		const userExists = await User.findOne({ email });
		if (userExists) {
			res.status(400).json({ message: "The user already exists" });
			throw new Error("The user already exists");
		} else {
			// Hash password
			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(password, salt);

			// Create a random username and check that it is unique
			let username = generateRandomUsername();
			let usernameExists = await User.findOne({ username });
			while (usernameExists) {
				username = generateRandomUsername();
				usernameExists = await User.findOne({ username });
			}

			// Create user and check for errors
			const user = await User.create({
				username,
				password: hashedPassword,
				email,
			});

			if (user) {
				res.status(201).json({ message: "User signed up!" });
			} else {
				res.status(400).json({ message: "Invalid user data" });
				throw new Error("Invalid user data");
			}
		}
	}
});

// Random username generator
function generateRandomUsername() {
	let username = "user";
	for (let i = 0; i < 12; i++) {
		username += Math.floor(Math.random() * 10);
	}

	return username;
}

// @desc    Log in a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	const { credential, password } = req.body;

	// Check all fields
	if (!credential || !password) {
		res.status(400).json({ message: "Please enter all fields" });
		throw new Error("Please enter all fields");
	} else {
		// Look up user and check if it exists
		const user = credential.includes("@")
			? await User.findOne({ email: credential })
			: await User.findOne({ username: credential });
		if (!user) {
			res.status(400).json({ message: "The user does not exist" });
			throw new Error("The user does not exist");
		} // Log user in
		else if (user && (await bcrypt.compare(password, user.password))) {
			res.status(201).json({ message: "User logged in!" });
		} else {
			res.status(400).json({ message: "Invalid password" });
			throw new Error("Invalid password");
		}
	}
});

// @desc    Get logged-in user
// @route   Get /api/users/login
// @access  Private
const getMe = asyncHandler(async (req, res) => {
	const { _id, email } = await User.findById(req.user.id);
	res.status(200).json({
		id: _id,
		email: email,
	});
});

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1d",
	});
};

// @desc    Send reset password email
// @route   GET /api/users/sendResetPasswordEmail
// @access  Public
const sendResetPasswordEmail = async (req, res) => {
	const { credential } = req.body;

	// Check all fields exist
	if (!credential) {
		res.status(400).json({ message: "Please enter all fields" });
	} else {
		// Look up user and check if it exists
		const user = credential.includes("@")
			? await User.findOne({ email: credential })
			: await User.findOne({ username: credential });
		if (!user) {
			res.status(400).json({ message: "Username or email not found" });
		} else {
			// Send email
			const email = user.email;
			const sgMail = require("@sendgrid/mail");

			sgMail.setApiKey(process.env.SENDGRID_API_KEY);
			const msg = {
				to: email,
				from: {
					name: "trnds",
					email: process.env.FROM_EMAIL,
				},
				templateId: process.env.TEMPLATE_ID,
			};
			sgMail
				.send(msg)
				.then(() => {
					res.status(200).json({ message: "Email sent!" });
				})
				.catch((error) => {
					res.status(400).json({ message: "Email failed to send" });
				});
		}
	}
};

// Update user
const updateUser = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ error: "The user does not exist." });
	}

	const user = await User.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		}
	);

	if (!user) {
		return res.status(404).json({ error: "The user does not exist." });
	}

	res.status(200).json(user);
};

// Delete a user
const deleteUser = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ error: "The user does not exist." });
	}

	const user = await User.findOneAndDelete({ _id: id });

	if (!user) {
		return res.status(404).json({ error: "The user does not exist." });
	}

	res.status(200).json(user);
};

module.exports = {
	getUsers,
	getUser,
	registerUser,
	loginUser,
	getMe,
	sendResetPasswordEmail,
	updateUser,
	deleteUser,
};
