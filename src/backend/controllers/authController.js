const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password, phoneNumber } = req.body;

    // Input Validation (handled by Mongoose schema but good for early exit)
    if (!username || !email || !password) {
        res.status(400);
        return next(new Error('Please provide username, email, and password.'));
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(409); // Conflict
        return next(new Error('User with this email already exists.'));
    }

    // Create user
    const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
    });

    if (user) {
        res.status(201).json({
            success: true,
            message: 'Account created successfully!',
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                token: generateToken(user._id),
            }
        });
        console.log(`User registered: ${user.email}`);
    } else {
        res.status(400);
        return next(new Error('Invalid user data provided.'));
    }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Input Validation
    if (!email || !password) {
        res.status(400);
        return next(new Error('Please enter both email and password.'));
    }

    // Check for user email and password
    const user = await User.findOne({ email }).select('+password'); // Explicitly select password for comparison

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
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
        console.log(`User logged in: ${user.email}`);
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
    res.status(200).json({
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