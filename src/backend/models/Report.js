// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, required: true, trim: true, maxlength: 1000 },
  location: {
    type: { type: String, enum: ['Point'], required: true, default: 'Point' },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere',
      validate: {
        validator: (coords) => coords.length === 2 && coords[0] >= -180 && coords[0] <= 180 && coords[1] >= -90 && coords[1] <= 90,
        message: 'Invalid coordinates',
      },
    },
    address: { type: String, required: true, trim: true },
  },
  category: {
    type: String,
    enum: ['Roads & Sidewalks', 'Waste & Sanitation', 'Public Lighting', 'Green Spaces', 'Water & Drainage', 'Other'],
    required: true,
    default: 'Other',
  },
  status: {
    type: String,
    enum: ['Pending', 'Received', 'Investigating', 'Resolved', 'Archived'],
    default: 'Pending',
  },
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  ],
  submittedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

reportSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Report', reportSchema);
