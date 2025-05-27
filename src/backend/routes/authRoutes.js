const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
    forgotPassword, 
    resetPassword   
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Route
router.get('/me', protect, getMe);

// NEW ROUTES FOR PASSWORD RESET
router.post('/forgotpassword', forgotPassword); // Endpoint to request a password reset code
router.put('/resetpassword/:resetToken', resetPassword); // Endpoint to submit new password with the code

module.exports = router;