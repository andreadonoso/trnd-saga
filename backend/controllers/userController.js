const User = require("../models/userModel");
const mongoose = require("mongoose");

// Get all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAT: -1 });
    res.status(200).json(users);
}

// Get a single user
const getUser = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "The user does not exist."});
    }

    const user = await User.findById(id);

    if(!user) {
        return res.status(404).json({error: "The user does not exist."});
    }

    res.status(200).json(user);
}

// Create a user
const createUser = async (req, res) => {
    const { 
        username,
        password,
        email,
        age,
        profile,
        bio,
        publicCollections,
        privateCollections,
        following,
        followers,
        wishlist,
        instagram,
        youtube,
        tiktok,
        x
    } = req.body;

    try {
        const user = await User.create({ 
            username,
            password,
            email,
            age,
            profile,
            bio,
            publicCollections,
            privateCollections,
            following,
            followers,
            wishlist,
            instagram,
            youtube,
            tiktok,
            x
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Update a user
const updateUser = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "The user does not exist."});
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!user) {
        return res.status(404).json({error: "The user does not exist."});
    }

    res.status(200).json(user);
}

// Delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "The user does not exist."});
    }

    const user = await User.findOneAndDelete({_id: id});

    if(!user) {
        return res.status(404).json({error: "The user does not exist."});
    }

    res.status(200).json(user)
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};