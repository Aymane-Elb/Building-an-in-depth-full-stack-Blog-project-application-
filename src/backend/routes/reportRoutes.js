// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinaryConfig');
const Report = require('../models/Report');
const { protect } = require('../middleware/authMiddleware');

const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image', folder: 'reports' },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });

router.post('/', protect, upload.array('images'), async (req, res) => {
  try {
    const { title, category, description, location, address } = req.body;

    if (!title || !category || !description || !location || !address)
      return res.status(400).json({ success: false, message: 'Missing fields' });

    let locData;
    try {
      locData = typeof location === 'string' ? JSON.parse(location) : location;
    } catch {
      return res.status(400).json({ success: false, message: 'Invalid location' });
    }

    if (!locData.lat || !locData.lng)
      return res.status(400).json({ success: false, message: 'Location requires lat and lng' });

    const images = [];
    if (req.files && req.files.length) {
      for (const file of req.files) {
        const uploaded = await uploadToCloudinary(file.buffer);
        images.push({ url: uploaded.secure_url, public_id: uploaded.public_id });
      }
    }

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

    res.status(201).json({ success: true, data: report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const reports = await Report.find({ submittedBy: req.user.id })
      .populate('submittedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: reports });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
