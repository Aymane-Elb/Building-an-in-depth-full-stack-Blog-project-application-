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

const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password, phoneNumber } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        return next(new Error('Please provide username, email, and password.'));
    }

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

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        return next(new Error('Please enter both email and password.'));
    }

    const user = await User.findOne({ email }).select('+password'); 

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
        res.status(401); 
        return next(new Error('Invalid email or password.'));
    }
});

const getMe = asyncHandler(async (req, res) => {
    // req.user is set by the protect middleware from the token
    res.status(200).json({
        success: true,
        message: 'User profile retrieved successfully.',
        data: req.user
    });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(200).json({ 
            success: true, 
            message: 'If an account with that email exists, a password reset code has been sent to your email.' 
        });
    }

    // Generate reset token and 6-digit code
    const resetData = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // CRITICAL DEBUG - Check what we're getting
    console.log('=== RESET DEBUG START ===');
    console.log('resetData full object:', resetData);
    console.log('resetData.code:', resetData.code);
    console.log('resetData.code type:', typeof resetData.code);
    console.log('resetData.token:', resetData.token);
    console.log('resetData.token type:', typeof resetData.token);
    console.log('=== RESET DEBUG END ===');

    // Extract the values properly
    const resetCode = resetData.code;
    const resetToken = resetData.token;

    // Verify they are strings
    console.log('Final resetCode:', resetCode, 'Type:', typeof resetCode);
    console.log('Final resetToken:', resetToken, 'Type:', typeof resetToken);

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password for your account.

Your password reset code is: ${resetCode}

This code is valid for 10 minutes. If you did not request this, please ignore this email.`;

    const htmlMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <h3 style="color: #007bff; margin: 0;">Your Reset Code:</h3>
                <h1 style="color: #333; letter-spacing: 2px; margin: 10px 0; font-size: 32px;">${resetCode}</h1>
                <p style="color: #666; margin: 0;">This code will expire in 10 minutes.</p>
            </div>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        </div>
    `;

    try {
        // Log what we're sending
        console.log('About to send email with message:', message);
        console.log('Email HTML contains code:', htmlMessage.includes(resetCode));

        await sendEmail({
            email: user.email,
            subject: 'Password Reset Request for Urban Signalez',
            message,
            html: htmlMessage
        });

        res.status(200).json({
            success: true,
            message: 'If an account with that email exists, a password reset code has been sent to your email.',
            resetToken: resetToken // Send token for frontend navigation
        });
        
        console.log(`Password reset email sent to: ${user.email}`);
        console.log(`Reset code sent: ${resetCode}`);
        
    } catch (err) {
        console.error('Email sending error:', err);
        user.passwordResetToken = undefined;
        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        res.status(500);
        return next(new Error('There was a problem sending the email. Please try again later.'));
    }
});

const resetPassword = asyncHandler(async (req, res, next) => {
    const tokenFromUrl = req.params.resetToken;
    const { code, password: newPassword } = req.body;

    if (!code || !newPassword) {
        res.status(400);
        return next(new Error('Please provide both reset code and new password.'));
    }

    // Hash the token from URL to compare with stored token
    const hashedToken = crypto.createHash('sha256').update(tokenFromUrl).digest('hex');
    
    // Hash the provided code to compare with stored code
    const hashedCode = crypto.createHash('sha256').update(String(code)).digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetCode: hashedCode,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
        res.status(400);
        return next(new Error('Invalid or expired password reset code.'));
    }

    // Basic password strength check
    if (newPassword.length < 6) {
        res.status(400);
        return next(new Error('New password must be at least 6 characters long.'));
    }

    // Set new password
    user.password = newPassword;
    
    // Clear reset fields
    user.passwordResetToken = undefined;
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    // Generate new token for immediate login
    const token = generateToken(user._id);

    res.status(200).json({
        success: true,
        message: 'Password has been successfully reset.',
        token,
        data: {
            _id: user._id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role
        }
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