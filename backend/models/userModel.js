const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: false, //true
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: false, //true
		},
		profile: {
			type: String,
			required: false,
		},
		bio: {
			type: String,
			required: false,
		},
		publicCollections: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: "Collection",
				},
			],
			default: [],
			required: false,
		},
		privateCollections: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: "Collection",
				},
			],
			default: [],
			required: false,
		},
		following: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: "User",
				},
			],
			default: [],
			required: false,
		},
		followers: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: "User",
				},
			],
			default: [],
			required: false,
		},
		wishlist: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: "Product",
				},
			],
			default: [],
			required: false,
		},
		instagram: {
			type: String,
			required: false,
		},
		youtube: {
			type: String,
			required: false,
		},
		tiktok: {
			type: String,
			required: false,
		},
		x: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
