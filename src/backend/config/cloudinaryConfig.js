// config/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with correct cloud name
cloudinary.config({
  cloud_name: 'deooyl39d', // ✅ FIXED: Changed from 'unsigned_preset1' to 'deooyl39d'
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Test the configuration
console.log('=== CLOUDINARY CONFIG ===');
console.log('Cloud name:', cloudinary.config().cloud_name);
console.log('API key configured:', !!cloudinary.config().api_key);
console.log('API secret configured:', !!cloudinary.config().api_secret);
console.log('=== END CONFIG ===');

module.exports = cloudinary;
