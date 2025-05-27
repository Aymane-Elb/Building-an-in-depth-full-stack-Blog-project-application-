const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        maxlength: [50, 'Username cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    phoneNumber: {
        type: String,
        match: [
            /^\+?[1-9]\d{9,14}$/,
            'Please enter a valid phone number (e.g., +1234567890)'
        ],
        required: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    // Password reset fields
    passwordResetToken: String,
    passwordResetCode: String, // Hashed 6-digit code
    passwordResetExpires: Date
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate 6-digit reset code
const generateResetCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Method to generate and hash password reset token and code
userSchema.methods.getResetPasswordToken = function() {
    // Generate a random token for URL
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Generate 6-digit code for user to enter
    const resetCode = generateResetCode();
    
    // Debug logging
    console.log('Generated reset token:', resetToken);
    console.log('Generated reset code:', resetCode);
    console.log('Reset code type:', typeof resetCode);
    
    // Hash both token and code before storing
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetCode = crypto.createHash('sha256').update(resetCode).digest('hex');
    
    // Set token expiry (10 minutes from now)
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    
    // Return both unhashed values as strings
    return {
        token: resetToken,
        code: resetCode
    };
};

module.exports = mongoose.model('User', userSchema);