// Updated routes/reportRoutes.js with detailed debugging
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinaryConfig');
const Report = require('../models/Report');
const { protect } = require('../middleware/authMiddleware');
const crypto = require('crypto');

// Enhanced uploadToCloudinary function with better error handling
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    console.log('=== CLOUDINARY UPLOAD ATTEMPT ===');
    console.log('Buffer size:', buffer.length);
    
    const stream = cloudinary.uploader.upload_stream(
      { 
        resource_type: 'image', 
        folder: 'reports',
        // Add transformation to ensure compatibility
        transformation: [
          { width: 1000, height: 1000, crop: 'limit' },
          { quality: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error('=== CLOUDINARY ERROR ===');
          console.error('Error details:', error);
          console.error('Error message:', error.message);
          console.error('Error code:', error.http_code);
          reject(error);
        } else {
          console.log('=== CLOUDINARY SUCCESS ===');
          console.log('Upload result:', {
            public_id: result.public_id,
            secure_url: result.secure_url,
            format: result.format,
            bytes: result.bytes
          });
          resolve(result);
        }
      }
    );
    stream.end(buffer);
  });

router.post('/', protect, upload.single('images', 5), async (req, res) => {
  try {
    console.log('=== REPORT SUBMISSION START ===');
    console.log('User ID:', req.user?.id);
    console.log('Request body:', req.body);
    console.log('Files received:', req.files?.length || 0);
    
    // Log each file details
    if (req.files && req.files.length > 0) {
      req.files.forEach((file, index) => {
        console.log(`File ${index + 1}:`, {
          fieldname: file.fieldname,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          buffer_exists: !!file.buffer,
          buffer_length: file.buffer?.length
        });
      });
    }

    const { title, category, description, location, address } = req.body;
    
    // Validation
    if (!title || !category || !description || !location || !address) {
      console.log('=== VALIDATION ERROR ===');
      console.log('Missing fields:', {
        title: !!title,
        category: !!category,
        description: !!description,
        location: !!location,
        address: !!address
      });
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Parse location
    let locData;
    try {
      locData = typeof location === 'string' ? JSON.parse(location) : location;
      console.log('Parsed location:', locData);
    } catch (err) {
      console.log('=== LOCATION PARSE ERROR ===');
      console.error('Location parsing error:', err.message);
      return res.status(400).json({ success: false, message: 'Invalid location format' });
    }

    if (!locData.lat || !locData.lng) {
      console.log('=== LOCATION VALIDATION ERROR ===');
      console.log('Location data:', locData);
      return res.status(400).json({ success: false, message: 'Location requires lat and lng' });
    }

    // Process images
    const images = [];
    if (req.files && req.files.length > 0) {
      console.log('=== PROCESSING IMAGES ===');
      
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        console.log(`Processing file ${i + 1}/${req.files.length}:`, file.originalname);
        
        try {
          const uploaded = await uploadToCloudinary(file.buffer);
          images.push({ 
            url: uploaded.secure_url, 
            public_id: uploaded.public_id 
          });
          console.log(`File ${i + 1} uploaded successfully:`, uploaded.public_id);
        } catch (uploadError) {
          console.error(`=== FILE ${i + 1} UPLOAD ERROR ===`);
          console.error('Upload error details:', uploadError);
          
          // Continue with other files, but log the error
          // You might want to return an error here depending on your requirements
          return res.status(500).json({ 
            success: false, 
            message: `Failed to upload image ${i + 1}: ${uploadError.message}` 
          });
        }
      }
    } else {
      console.log('=== NO IMAGES TO PROCESS ===');
    }

    console.log('=== CREATING REPORT ===');
    console.log('Final images array:', images);

    const report = new Report({
      title: title.trim(),
      category,
      description: description.trim(),
      location: {
        type: 'Point',
        coordinates: [parseFloat(locData.lng), parseFloat(locData.lat)],
        address: address.trim(),
      },
      images,
      submittedBy: req.user.id,
    });

    await report.save();
    console.log('=== REPORT SAVED SUCCESSFULLY ===');
    console.log('Report ID:', report._id);

    res.status(201).json({ success: true, data: report });
  } catch (error) {
    console.error('=== GENERAL ERROR ===');
    console.error('Error details:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
});

// GET route with better error handling
router.get('/', protect, async (req, res) => {
  try {
    console.log('=== FETCHING REPORTS ===');
    console.log('User ID:', req.user?.id);
    
    const reports = await Report.find({ submittedBy: req.user.id })
      .populate('submittedBy', 'name email')
      .sort({ createdAt: -1 });
    
    console.log('Reports found:', reports.length);
    res.json({ success: true, data: reports });
  } catch (error) {
    console.error('=== FETCH REPORTS ERROR ===');
    console.error('Error details:', error);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
});

// Add a test route to check Cloudinary configuration
router.get('/test-cloudinary', protect, async (req, res) => {
  try {
    console.log('=== CLOUDINARY CONFIG TEST ===');
    console.log('Cloud name:', cloudinary.config().cloud_name);
    console.log('API key exists:', !!cloudinary.config().api_key);
    console.log('API secret exists:', !!cloudinary.config().api_secret);
    
    // Test upload with a simple buffer
    const testBuffer = Buffer.from('test-image-data');
    
    try {
      const result = await cloudinary.uploader.upload(`data:image/png;base64,${testBuffer.toString('base64')}`, {
        folder: 'test'
      });
      
      // Clean up test image
      await cloudinary.uploader.destroy(result.public_id);
      
      res.json({ 
        success: true, 
        message: 'Cloudinary connection successful',
        config: {
          cloud_name: cloudinary.config().cloud_name,
          api_key_configured: !!cloudinary.config().api_key,
          api_secret_configured: !!cloudinary.config().api_secret
        }
      });
    } catch (cloudinaryError) {
      res.status(500).json({ 
        success: false, 
        message: 'Cloudinary test failed', 
        error: cloudinaryError.message 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Test failed', 
      error: error.message 
    });
  }
});

module.exports = router;