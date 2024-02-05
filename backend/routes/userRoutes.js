const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// GET all
router.get('/', (req, res) => {
    res.json({mssg: "GET all users"})
});

// GET single
router.get('/:id', (req, res) => {
    res.json({mssg: "GET a single user"})
});

// POST user
router.post('/', async (req, res) => {
    const { 
        username, 
        password, 
        email, 
        age, 
        numPublicCollections, 
        publicCollections, 
        privateCollections, 
        following, 
        followers
    } = req.body;
    
    try {
        const user = await User.create({ 
            username, 
            password, 
            email, 
            age, 
            numPublicCollections, 
            publicCollections, 
            privateCollections, 
            following, 
            followers
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// DELETE user
router.delete('/:id', (req, res) => {
    res.json({mssg: "DELETE a new user"})
})

// UPDATE user
router.patch('/:id', (req, res) => {
    res.json({mssg: "UPDATE a new user"})
})

module.exports = router;