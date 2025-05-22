// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const {
    getReports,
    getReportById,
    createReport, // <--- This is the function we're modifying
    updateReport,
    deleteReport,
    getMyReports
} = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // Multer middleware

//router.route('/')
    //.get(getReports)
   // .post(protect, upload.array('images', 3), createReport); // This route will handle your Signalez form submission

//router.route('/my-reports')
    //.get(protect, getMyReports);

//router.route('/:id')
    //.get(getReportById)
   // .put(protect, updateReport)
   // .delete(protect, authorize('admin'), deleteReport);

module.exports = router;