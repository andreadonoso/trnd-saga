const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
    getUsers,
    getUser,
    registerUser,
    loginUser,
    getMe,
    sendResetPasswordEmail,
    updateUser,
    deleteUser
} = require("../controllers/userController");

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/sendResetPasswordEmail', sendResetPasswordEmail);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;