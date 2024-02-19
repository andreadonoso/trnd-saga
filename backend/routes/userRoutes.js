const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

// Get all users
router.get('/', getUsers);

// Get a single user
router.get('/:id', getUser);

// Create a user
router.post('/', createUser);

// Update a user
router.patch('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

module.exports = router;