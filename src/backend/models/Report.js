// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title: { // This will correspond to 'Problem Type' if you map it that way, or you might need a new 'type' field
        type: String,
        required: [true, 'Please add a title for the report'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: false // Based on your form, location is optional initially, but ideal to be required.
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            index: '2dsphere', // For geospatial queries
            required: false
        },
        address: String // Optional: human-readable address (e.g., city from LocationPicker)
    },
    category: { // This will correspond to 'Problem Type' from your form
        type: String,
        enum: ['Pollution', 'Infrastructure Damage', 'Wildlife Disturbance', 'Illegal Activity', 'Other'],
        default: 'Other'
    },
    status: {
        type: String,
        enum: ['Pending', 'Received', 'Investigating', 'Resolved', 'Archived'],
        default: 'Pending'
    },
    images: [
        {
            url: String, // Cloudinary secure_url
            public_id: String // Cloudinary public_id
        }
    ],
    submittedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Report must be submitted by a user']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update `updatedAt` field on save
reportSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Report', reportSchema);