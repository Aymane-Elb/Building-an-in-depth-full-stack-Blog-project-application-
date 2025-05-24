const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

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

    // Basic Input Validation
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
    // req.user is set by the protect middleware from the token
    res.status(200).json({
        success: true,
        message: 'User profile retrieved successfully.',
        data: req.user
    });
});

// @desc    Forgot Password - Request a password reset token
// @route   POST /api/auth/forgotpassword
// @access  Public
const forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        // IMPORTANT: For security, always send a generic success message even if email not found.
        // This prevents attackers from enumerating valid email addresses.
        return res.status(200).json({ success: true, message: 'If an account with that email exists, a password reset code has been sent to your email.' });
    }

    // --- DEBUGGING LINES START ---
    console.log('--- Debugging forgotPassword ---');
    console.log('User found:', user.email);
    console.log('Is user.getResetPasswordToken a function?', typeof user.getResetPasswordToken);
    if (typeof user.getResetPasswordToken !== 'function') {
        console.error('CRITICAL ERROR: user.getResetPasswordToken is NOT a function!');
        console.error('Available methods on user object prototype:', Object.keys(Object.getPrototypeOf(user)));
        // You might want to throw an error here, or return a 500
        res.status(500);
        return next(new Error('Server configuration error: Password reset function not found.'));
    }
    console.log('--- Debugging forgotPassword END ---');
    // --- DEBUGGING LINES END ---

    // Get reset token from user model method
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false }); // Save user with the new token and expiry

    // Create reset URL or message with the token
    // For this flow, we'll send the raw token as a "code" to be entered by the user.
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password for your account. Your password reset code is:\n\n${resetToken}\n\nThis code is valid for 10 minutes. If you did not request this, please ignore this email.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset Request for Urban Signalez',
            message
        });

        res.status(200).json({
            success: true,
            message: 'If an account with that email exists, a password reset code has been sent to your email.'
        });
        console.log(`Password reset email sent to: ${user.email}`);
    } catch (err) {
        console.error('Email sending error:', err);
        // Clear the token if email sending fails to prevent a stale token
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        res.status(500);
        return next(new Error('There was a problem sending the email. Please try again later.'));
    }
});

// @desc    Reset Password - Update password using the reset token
// @route   PUT /api/auth/resetpassword/:resetToken
// @access  Public
const resetPassword = asyncHandler(async (req, res, next) => {
    // Get hashed token from URL parameter
    const tokenFromUrl = req.params.resetToken;
    const hashedToken = crypto.createHash('sha256').update(tokenFromUrl).digest('hex');

    // Find user by hashed token and check expiry
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() } // $gt means "greater than" (i.e., not expired)
    });

    if (!user) {
        res.status(400);
        return next(new Error('Invalid or expired password reset token.'));
    }

    // Set new password from request body
    if (!req.body.password) {
        res.status(400);
        return next(new Error('Please provide a new password.'));
    }
    // Basic password strength check (optional, but good practice)
    if (req.body.password.length < 6) {
        res.status(400);
        return next(new Error('New password must be at least 6 characters long.'));
    }
    user.password = req.body.password; // Mongoose pre-save hook will hash this new password

    // Clear reset token fields after successful reset
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save(); // Save the user with the new hashed password

    res.status(200).json({
        success: true,
        message: 'Password has been successfully reset. You can now log in with your new password.'
    });
    console.log(`User password reset for: ${user.email}`);
});


module.exports = {
    registerUser,
    loginUser,
    getMe,
    forgotPassword,
    resetPassword
};