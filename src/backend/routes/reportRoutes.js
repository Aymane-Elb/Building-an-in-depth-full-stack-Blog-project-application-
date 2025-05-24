// src/backend/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const {
    getReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport,
    getMyReports,
} = require('../controllers/reportController'); // Import from the new reportController

const { protect } = require('../middleware/authMiddleware'); // Assuming you have this middleware

// Public Routes
router.get('/', getReports);
router.get('/:id', getReportById);

// Protected Routes
router.post('/', protect, createReport); // Requires authentication to create
router.put('/:id', protect, updateReport); // Requires authentication to update
router.delete('/:id', protect, deleteReport); // Requires authentication to delete
router.get('/my-reports', protect, getMyReports); // Requires authentication to get user's reports

module.exports = router;