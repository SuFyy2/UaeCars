const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware'); // ✅ Fixed: no destructuring

// Register a new user
router.post('/register', registerUser);

// Login existing user
router.post('/login', loginUser);

// Protected routes
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
