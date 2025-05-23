const Report = require('../models/Report');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const cloudinary = require('../config/cloudinaryConfig');

// @desc    Fetch all reports
// @route   GET /api/reports
// @access  Public
const getReports = asyncHandler(async (req, res) => {
    const reports = await Report.find({})
        .populate('submittedBy', 'username email');
    res.json(reports);
});

// @desc    Fetch single report by ID
// @route   GET /api/reports/:id
// @access  Public
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

// @desc    Create a new report
// @route   POST /api/reports
// @access  Private
const createReport = asyncHandler(async (req, res) => {
    const {
        problemType, // This will be the title and category
        description,
        city,
        location: locationString // Expecting a JSON string from frontend
    } = req.body;

    // --- Input Validation ---
    if (!problemType || !description || !city || !locationString) {
        res.status(400);
        throw new Error('Please provide problem type, description, city, and location.');
    }

    let location = null;
    try {
        const parsedLocation = JSON.parse(locationString);
        if (parsedLocation.lat != null && parsedLocation.lng != null) {
            location = {
                type: 'Point',
                coordinates: [parsedLocation.lng, parsedLocation.lat], // MongoDB expects [longitude, latitude]
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
        title: problemType, // Using problemType as title
        description,
        location,
        category: problemType, // Using problemType as category
        images: uploadedImages,
        submittedBy: req.user._id, // From protect middleware
    });

    res.status(201).json(report);
});

// @desc    Update a report
// @route   PUT /api/reports/:id
// @access  Private (Reporter or Admin)
const updateReport = asyncHandler(async (req, res) => {
    const {
        problemType, // Maps to 'category' and potentially 'title'
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
        res.status(403); // Forbidden
        throw new Error('Not authorized to update this report');
    }

    // Update status (only admin can change to any, owner can change to specific if allowed)
    if (isAdmin && status) {
        report.status = status;
    } else if (isOwner && status && (status === 'Pending' || status === 'Received')) {
        // Example: Owner can only change to 'Pending' or 'Received'
        report.status = status;
    }

    // Update other fields if provided
    report.title = problemType !== undefined ? problemType : report.title;
    report.description = description !== undefined ? description : report.description;
    report.category = problemType !== undefined ? problemType : report.category;

    // Handle location update
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
        // If no existing location but city is provided, create a basic location object
        report.location = { type: 'Point', coordinates: [], address: city };
    }

    // IMPORTANT: This PUT endpoint does NOT handle new image uploads.
    // To add or remove images, consider separate POST/DELETE endpoints
    // like /api/reports/:id/images (POST to add), /api/reports/:id/images/:imageId (DELETE to remove).
    if (req.files && req.files.length > 0) {
        console.warn("New image uploads ignored in PUT /api/reports/:id. Implement separate image management endpoints.");
        res.status(400);
        throw new Error("Image uploads are not supported directly via this update endpoint. Please use specific image upload routes.");
    }

    const updatedReport = await report.save();
    res.json(updatedReport);
});

// @desc    Delete a report
// @route   DELETE /api/reports/:id
// @access  Private (Reporter or Admin)
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

    // Delete images from Cloudinary
    if (report.images && report.images.length > 0) {
        for (const image of report.images) {
            try {
                await cloudinary.uploader.destroy(image.public_id);
                console.log(`Deleted image from Cloudinary: ${image.public_id}`);
            } catch (error) {
                console.error(`Failed to delete image ${image.public_id} from Cloudinary:`, error);
                // Continue with report deletion even if image deletion fails for one image
            }
        }
    }

    await Report.deleteOne({ _id: report._id });
    res.json({ message: 'Report removed successfully' });
});

// @desc    Get reports by the logged-in user
// @route   GET /api/reports/my-reports
// @access  Private (User or Admin)
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