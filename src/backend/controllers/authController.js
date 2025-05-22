// controllers/authController.js
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => { // Added 'next' for custom error handling
    const { username, email, password, phoneNumber } = req.body;

    // --- Basic Input Validation (Optional but good practice here) ---
    if (!username || !email || !password) {
        res.status(400);
        return next(new Error('Please enter all required fields: username, email, and password.'));
    }

    // You could add more specific validation here, e.g., email format regex if not already in schema
    // or minimum username length. The Mongoose schema handles much of this already.

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(409); // Conflict status for existing resource
        return next(new Error('User with that email already exists.'));
    }

    try {
        // Create user
        const user = await User.create({
            username,
            email,
            password,
            phoneNumber,
        });

        if (user) {
            res.status(201).json({
                success: true, // Added success flag
                message: 'Account created successfully!', // Added a success message
                data: { // Structured response data
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    token: generateToken(user._id),
                }
            });
            console.log(`User registered: ${user.email}`); // Added logging
        } else {
            res.status(400);
            return next(new Error('Invalid user data provided.'));
        }
    } catch (error) {
        // Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            res.status(400);
            return next(new Error(messages.join(', ')));
        }
        // Other potential errors during creation
        res.status(500);
        return next(new Error('Server error during user registration.'));
    }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => { // Added 'next'
    const { email, password } = req.body;

    // --- Basic Input Validation ---
    if (!email || !password) {
        res.status(400);
        return next(new Error('Please enter both email and password.'));
    }

    // Check for user email
    const user = await User.findOne({ email }).select('+password'); // Select password explicitly

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({ // Explicitly setting 200 OK
            success: true,
            message: 'Logged in successfully!',
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                token: generateToken(user._id),
            }
        });
        console.log(`User logged in: ${user.email}`); // Added logging
    } else {
        res.status(401); // Unauthorized
        return next(new Error('Invalid email or password.'));
    }
});

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    // req.user is set by the protect middleware
    res.status(200).json({ // Explicitly setting 200 OK
        success: true,
        message: 'User profile retrieved successfully.',
        data: req.user
    });
});

module.exports = {
    registerUser,
    loginUser,
    getMe,
};