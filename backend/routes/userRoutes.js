const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
    getUsers,
    // getUser,
    registerUser,
    loginUser,
    getMe,
    updateUser,
    deleteUser
} = require("../controllers/userController");

// Get all users
router.get('/', getUsers);

// Get a single user
// router.get('/:id', getUser);

// Register a user
router.post('/', registerUser);

// Log in a user
router.post('/login', loginUser);

// Get Me
router.get('/me', protect, getMe);

// Update a user
router.patch('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

module.exports = router;