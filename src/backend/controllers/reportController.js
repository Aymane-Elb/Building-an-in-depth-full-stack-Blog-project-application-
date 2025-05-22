// controllers/reportController.js
const Report = require('../models/Report');
const User = require('../models/User'); // To populate submittedBy user details
const asyncHandler = require('../middleware/asyncHandler'); 
const cloudinary = require('../config/cloudinaryConfig');

// @desc    Get all reports
// @route   GET /api/reports
// @access  Public
const getReports = asyncHandler(async (req, res) => {
    // Basic filtering, sorting, pagination could be added here
    const reports = await Report.find({})
        .populate('submittedBy', 'username email'); // Populate user details
    res.json(reports);
});

// @desc    Get single report by ID
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
// @access  Private (User or Admin)
const createReport = asyncHandler(async (req, res) => {
    // Extract data from the form (req.body contains text fields, req.files contains images)
    const {
        problemType, // From your frontend's 'Problem Type' input - map to 'category'
        description,
        city,        // From your frontend's 'City' input and LocationPicker
        location: locationString // location from frontend is a JSON string
    } = req.body;

    // Default title for now, you can adjust this if 'Problem Type' should be the title
    // Or add a separate 'title' input in your frontend
    const title = problemType || 'General Problem Report';

    let location = null;
    if (locationString) {
        try {
            const parsedLocation = JSON.parse(locationString);
            if (parsedLocation.lat && parsedLocation.lng) {
                location = {
                    type: 'Point',
                    // MongoDB expects [longitude, latitude]
                    coordinates: [parsedLocation.lng, parsedLocation.lat],
                    address: city // Store the city as the address
                };
            } else {
                res.status(400);
                throw new Error('Invalid location coordinates received.');
            }
        } catch (e) {
            res.status(400);
            throw new Error('Invalid location data format. Expected a JSON string for location.');
        }
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
                // Important: If image upload fails, decide if report creation should also fail
                res.status(500);
                throw new Error('Image upload failed.');
            }
        }
    }

    const report = await Report.create({
        title,
        description,
        location,
        category: problemType, // Map 'Problem Type' from frontend to 'category' in model
        images: uploadedImages,
        submittedBy: req.user._id, // Reporter is the logged-in user (from protect middleware)
    });

    res.status(201).json(report);
});

// @desc    Update a report
// @route   PUT /api/reports/:id
// @access  Private (Reporter or Admin)
const updateReport = asyncHandler(async (req, res) => {
    // Extract updated fields. Note: 'problemType' and 'city' are from frontend form,
    // they need to be mapped to 'category' and 'location.address' respectively.
    const {
        problemType, // Maps to 'category' in model
        description,
        city,        // Maps to 'location.address' in model
        location: locationString, // location from frontend is a JSON string
        status // Admin can change this
    } = req.body;

    const report = await Report.findById(req.params.id);

    if (report) {
        // Check if user is the reporter or an admin
        const isOwner = report.submittedBy.toString() === req.user._id.toString();
        const isAdmin = req.user.role === 'admin';

        if (!isOwner && !isAdmin) {
            res.status(403); // Forbidden
            throw new Error('Not authorized to update this report');
        }

        // Only admin can change status (or owner if allowed by specific rules)
        if (isAdmin && status) { // Admin can set any status
            report.status = status;
        } else if (isOwner && status && (status === 'Pending' || status === 'Received')) {
            // Example: Owner can only change to 'Pending' or 'Received' (adjust as needed)
            report.status = status;
        }


        // Update fields if provided
        report.title = req.body.title || report.title; // If you add a 'title' field to frontend
        report.description = description || report.description;
        report.category = problemType || report.category; // Update category from problemType
        report.updatedAt = Date.now(); // Update timestamp

        // Handle location update (if provided and valid)
        if (locationString) {
            try {
                const parsedLocation = JSON.parse(locationString);
                if (parsedLocation.lat && parsedLocation.lng) {
                    report.location = {
                        type: 'Point',
                        coordinates: [parsedLocation.lng, parsedLocation.lat],
                        address: city || (report.location ? report.location.address : undefined) // Update address
                    };
                } else {
                    res.status(400);
                    throw new Error('Invalid location coordinates received for update.');
                }
            } catch (e) {
                res.status(400);
                throw new Error('Invalid location data format for update. Expected a JSON string for location.');
            }
        } else if (city) { // If only city is updated without new coordinates
             if (report.location) {
                 report.location.address = city;
             } else {
                 // What to do if no existing location but city is provided? Create a location object?
                 // For now, it will only update if location object already exists.
             }
        }


        // Image update logic (more complex, requires separate handling)
        // This 'updateReport' doesn't handle adding/removing images directly from a PUT request.
        // You'd typically have separate endpoints for image management (e.g., DELETE /api/reports/:id/images/:imageId, POST /api/reports/:id/images)
        // If images are sent in a PUT, you'd need logic to compare existing vs. new images and delete/upload accordingly.

        const updatedReport = await report.save();
        res.json(updatedReport);

    } else {
        res.status(404);
        throw new Error('Report not found');
    }
});

// @desc    Delete a report
// @route   DELETE /api/reports/:id
// @access  Private (Reporter or Admin)
const deleteReport = asyncHandler(async (req, res) => {
    const report = await Report.findById(req.params.id);

    if (report) {
        // Check if user is the reporter or an admin
        const isOwner = report.submittedBy.toString() === req.user._id.toString();
        const isAdmin = req.user.role === 'admin';

        if (!isOwner && !isAdmin) {
            res.status(403); // Forbidden
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
                    // Decide if you want to stop or continue if image deletion fails
                }
            }
        }

        await Report.deleteOne({ _id: report._id }); // Use deleteOne with query
        res.json({ message: 'Report removed successfully' });
    } else {
        res.status(404);
        throw new Error('Report not found');
    }
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