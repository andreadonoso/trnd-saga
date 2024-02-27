require('dotenv').config();
const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Get all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAT: -1 });
    res.status(200).json(users);
}

// Get a single user
// const getUser = async (req, res) => {
//     const { id } = req.params;

//     if(!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: "The user does not exist."});
//     }

//     const user = await User.findById(id);

//     if(!user) {
//         return res.status(404).json({error: "The user does not exist."});
//     }

//     res.status(200).json(user);
// }

// @desc    Register a user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    try {

        const { 
            password,
            email,
        } = req.body;

        // Check all fields
        if(!email || !password)
        {
            res.status(400);
            throw new Error('Please enter all fields');
        }

        // Check if user already exists
        const userExists = await (User.findOne({email}));
        if(userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a random username and check that it is unique
        let username = generateRandomUsername();

        let usernameExists = await (User.findOne({username}));
        while(usernameExists)
        {
            username = generateRandomUsername();
            usernameExists = await (User.findOne({username}));
        }
 
        // Create user
        const user = await User.create({ 
            username,
            password: hashedPassword,
            email,
        });

        if(user) {
            res.status(201).json({
                _id: user.id,
                token: generateToken(user._id),
            });       
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// Random username generator
function generateRandomUsername() {
    let username = 'user';
    for(let i=0; i<12; i++)
    {
        username += Math.floor(Math.random()*10);
    }
    
    return username;
}

// @desc    Log in a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { 
        username,
        email, 
        password 
    } = req.body;

    if ((email && username || !email && ! username) || !password) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    // Look up user and check if it exists
    const user = (email && !username) ? await User.findOne({ email }) : await User.findOne({ username });
    if (!user) {
        res.status(400);
        throw new Error('Credential not found');
    }

    // Log user in
    if (user && (await bcrypt.compare(password, user.password))) {
        // const accessToken = jwt.sign({credential: (email && !username) ? email : username }, process.env.ACCESS_TOKEN_SECRET);
        res.status(201).json({
            message: 'User logged in!',
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                token: generateToken(user._id),
            },
            // accessToken: accessToken
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

// @desc    Get logged-in user
// @route   Get /api/users/login
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, email } = await User.findById(req.user.id);
    res.status(200).json({ 
        id: _id, 
        email: email
    });
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
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
    // getUser,
    registerUser,
    loginUser,
    getMe,
    updateUser,
    deleteUser
};