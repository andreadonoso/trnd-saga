require("dotenv").config();
const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

// EDIT
// @desc    Get all users
// @route   GET /api/users/
// @access  Private
const getUsers = async (req, res) => {
	const users = await User.find({}).sort({ createdAT: -1 });
	res.status(200).json(users);
};

// EDIT
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
				res.status(201).json({
					message: "User registered successfully",
				});
			} else {
				res.status(400).json({ message: "Invalid user data" });
				throw new Error("Invalid user data");
			}
		}
	}
});

// @desc Random username generator
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
			if (user.emailVerified) generateToken(res, user._id);
			res.status(201).json({
				_id: user._id,
				username: user.username,
				email: user.email,
				emailVerified: user.emailVerified,
			});
		} else {
			res.status(400).json({ message: "Invalid email or password" });
			throw new Error("Invalid email or password");
		}
	}
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).json({ message: "User logged out" });
});

// EDIT
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = {
		username: req.user.username,
	};
	res.status(200).json(user);
});

// EDIT
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.username = req.body.username || user.username;
		user.email = req.body.email || user.email;

		// Update user password
		if (req.body.password) {
			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(req.body.password, salt);
			user.password = hashedPassword;
		}
		const updatedUser = await user.save();

		res.status(200).json({
			_id: updatedUser._id,
			username: updatedUser.username,
			email: updatedUser.email,
			emailVerified: updatedUser.emailVerified,
			password: updatedUser.password,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @desc    Send email
// @route   POST /api/users/sendEmail
// @access  Public
const sendEmail = asyncHandler(async (req, res) => {
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

			const accountSid = process.env.TWILIO_ACCOUNT_SID;
			const authToken = process.env.TWILIO_AUTH_TOKEN;
			const template = process.env.TEMPLATE_ID;
			const client = require("twilio")(accountSid, authToken);

			client.verify.v2
				.services("VA1e1efd81385be28256ae9cdc28fc9a61")
				.verifications.create({
					channelConfiguration: {
						template_id: "d-d73cc42785ab46158034f2bb46d571da",
					},
					to: email,
					channel: "email",
				})
				.then((verification) => {
					res.status(200).json({
						message: "Email sent successfully!",
					});
				})
				.catch((error) => {
					console.error(error);
					res.status(500).json({
						message: error.message + ". Error code " + error.code,
					});
				});
		}
	}
});

// @desc    Verify email
// @route   POST /api/users/verifyEmail
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {
	const { credential, code } = req.body;

	if (!code || !credential) {
		res.status(400).json({ message: "Please enter all fields" });
	} else {
		const accountSid = process.env.TWILIO_ACCOUNT_SID;
		const authToken = process.env.TWILIO_AUTH_TOKEN;
		const client = require("twilio")(accountSid, authToken);

		// Find email
		const user = credential.includes("@")
			? await User.findOne({ email: credential })
			: await User.findOne({ username: credential });

		if (!user) {
			res.status(400).json({ message: "Username or email not found" });
		} else {
			client.verify.v2
				.services("VA1e1efd81385be28256ae9cdc28fc9a61")
				.verificationChecks.create({ to: user.email, code: code })
				.then((verification_check) => {
					if (verification_check.status === "approved") {
						return User.findOneAndUpdate(
							{ email: user.email },
							{ emailVerified: true },
							{ new: true }
						);
					}
				})
				.then((user) => {
					if (user) {
						generateToken(res, user._id);
						res.status(200).json({
							_id: user._id,
							username: user.username,
							email: user.email,
							emailVerified: user.emailVerified,
						});
					} else
						res.status(400).json({
							message: "Incorrect verification code",
						});
				})
				.catch((error) => {
					console.error(error);
					res.status(error.status).json({
						message: error.message + ". Error code " + error.code,
					});
				});
		}
	}
});

// @desc    Reset password
// @route   PATCH /api/users/reset
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
	const { id, password } = req.body;

	// Check all fields
	if (!id || !password) {
		res.status(400).json({ message: "Please enter all fields" });
		throw new Error("Please enter all fields");
	} else {
		// Hash password
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		// Look up user and update password if it exists
		const user = await User.findOneAndUpdate(
			{ _id: id },
			{
				password: hashedPassword,
			},
			{ new: true }
		);

		if (!user) {
			res.status(400).json({ message: "The user does not exist" });
			throw new Error("The user does not exist");
		} // Log user in
		else if (user) {
			generateToken(res, user._id);
			res.status(201).json({
				_id: user._id,
				username: user.username,
				email: user.email,
				emailVerified: user.emailVerified,
			});
		} else {
			res.status(400).json({ message: "Invalid email or password" });
			throw new Error("Invalid email or password");
		}
	}
});

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
	getUserProfile,
	updateUserProfile,
	logoutUser,
	sendEmail,
	verifyEmail,
	resetPassword,
	updateUser,
	deleteUser,
};
