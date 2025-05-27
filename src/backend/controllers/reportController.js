// src/backend/controllers/reportController.js
const Report = require('../models/Report');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const cloudinary = require('../config/cloudinaryConfig');

const getReports = asyncHandler(async (req, res) => {
    const reports = await Report.find({})
        .populate('submittedBy', 'username email');
    res.json(reports);
});

const getReportById = asyncHandler(async (req, res) => {
    const report = await Report.findById(req.params.id)
        .populate('submittedBy', 'username email');

    if (report) {
        res.json(report);
    } else {
        res.status(404);
        throw new Error('Report not found');
    }
});

const createReport = asyncHandler(async (req, res) => {
    const {
        problemType,
        description,
        city,
        location: locationString
    } = req.body;

    // Input Validation
    if (!problemType || !description || !city || !locationString) {
        res.status(400);
        throw new Error('Please provide problem type, description, city, and location.'); // Fixed: removed extra 'new'
    }

    let location = null;
    try {
        const parsedLocation = JSON.parse(locationString);
        if (parsedLocation.lat != null && parsedLocation.lng != null) {
            location = {
                type: 'Point',
                coordinates: [parsedLocation.lng, parsedLocation.lat],
                address: city
            };
        } else {
            res.status(400);
            throw new Error('Invalid location coordinates (latitude or longitude missing).');
        }
    } catch (e) {
        res.status(400);
        throw new Error('Invalid location data format. Expected a JSON string.');
    }

    const uploadedImages = [];
    if (req.files && req.files.length > 0) {
        for (const file of req.files) {
            try {
                const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
                    folder: 'urban-marine-reports',
                    resource_type: 'image',
                    quality: 'auto:good',
                    fetch_format: 'auto'
                });
                uploadedImages.push({
                    url: result.secure_url,
                    public_id: result.public_id
                });
            } catch (error) {
                console.error('Cloudinary upload error:', error);
                res.status(500);
                throw new Error('Image upload failed.');
            }
        }
    }

    const report = await Report.create({
        title: problemType,
        description,
        location,
        category: problemType,
        images: uploadedImages,
        submittedBy: req.user._id,
    });

    res.status(201).json(report);
});

const updateReport = asyncHandler(async (req, res) => {
    const {
        problemType,
        description,
        city,
        location: locationString,
        status
    } = req.body;

    const report = await Report.findById(req.params.id);

    if (!report) {
        res.status(404);
        throw new Error('Report not found');
    }

    const isOwner = report.submittedBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
        res.status(403);
        throw new Error('Not authorized to update this report');
    }

    if (isAdmin && status) {
        report.status = status;
    } else if (isOwner && status && (status === 'Pending' || status === 'Received')) {
        report.status = status;
    }

    report.title = problemType !== undefined ? problemType : report.title;
    report.description = description !== undefined ? description : report.description;
    report.category = problemType !== undefined ? problemType : report.category;

    if (locationString) {
        try {
            const parsedLocation = JSON.parse(locationString);
            if (parsedLocation.lat != null && parsedLocation.lng != null) {
                report.location = {
                    type: 'Point',
                    coordinates: [parsedLocation.lng, parsedLocation.lat],
                    address: city !== undefined ? city : (report.location ? report.location.address : undefined)
                };
            } else {
                res.status(400);
                throw new Error('Invalid location coordinates received for update.');
            }
        } catch (e) {
            res.status(400);
            throw new Error('Invalid location data format for update.');
        }
    } else if (city !== undefined && report.location) {
        report.location.address = city;
    } else if (city !== undefined && !report.location) {
        report.location = { type: 'Point', coordinates: [], address: city };
    }

    if (req.files && req.files.length > 0) {
        console.warn("New image uploads ignored in PUT /api/reports/:id. Implement separate image management endpoints.");
        res.status(400);
        throw new Error("Image uploads are not supported directly via this update endpoint. Please use specific image upload routes.");
    }

    const updatedReport = await report.save();
    res.json(updatedReport);
});

const deleteReport = asyncHandler(async (req, res) => {
    const report = await Report.findById(req.params.id);

    if (!report) {
        res.status(404);
        throw new Error('Report not found');
    }

    const isOwner = report.submittedBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
        res.status(403);
        throw new Error('Not authorized to delete this report');
    }

    if (report.images && report.images.length > 0) {
        for (const image of report.images) {
            try {
                await cloudinary.uploader.destroy(image.public_id);
                console.log(`Deleted image from Cloudinary: ${image.public_id}`);
            } catch (error) {
                console.error(`Failed to delete image ${image.public_id} from Cloudinary:`, error);
            }
        }
    }

    await Report.deleteOne({ _id: report._id });
    res.json({ message: 'Report removed successfully' });
});

const getMyReports = asyncHandler(async (req, res) => {
    const reports = await Report.find({ submittedBy: req.user._id })
        .populate('submittedBy', 'username email');
    res.json(reports);
});

module.exports = {
    getReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport,
    getMyReports,
};