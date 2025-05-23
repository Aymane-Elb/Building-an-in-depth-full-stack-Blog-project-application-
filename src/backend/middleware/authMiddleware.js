const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path as needed
const asyncHandler = require('./asyncHandler'); // Assuming this path is correct

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token (excluding password)
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            next();
        } catch (error) {
            console.error('Authentication Error:', error.message);
            res.status(401);
            if (error.name === 'TokenExpiredError') {
                throw new Error('Not authorized, token expired');
            } else if (error.name === 'JsonWebTokenError') {
                throw new Error('Not authorized, invalid token');
            } else {
                throw new Error('Not authorized, token failed');
            }
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token provided');
    }
});

// @desc    Authorize roles - Restrict access based on user roles
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403);
            throw new Error(`User role ${req.user.role} is not authorized to access this route`);
        }
        next();
    };
};

module.exports = { protect, authorize };