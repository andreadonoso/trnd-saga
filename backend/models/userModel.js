const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    numPublicCollections: {
        type: Number,
        required: true
    },
    publicCollections: {
        type: Number,
        required: true
    },
    privateCollections: {
        type: Number,
        required: true
    },
    following: {
        type: Number,
        required: true
    },
    followers: {
        type: Number,
        required: true
    },
    // cart: {
    //     type: [Product],
    //     required: true
    // },
    // instagram: {
    //     type: url/link???,
    //     required: false
    // },
    // youtube: {
    //     type: String,
    //     required: false
    // },
    // tiktok: {
    //     type: String,
    //     required: false
    // },
    // x: {
    //     type: String,
    //     required: false
    // },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;