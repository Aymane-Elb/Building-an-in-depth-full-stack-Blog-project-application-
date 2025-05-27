const express = require('express');
const router = express.Router();
const {
    getReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport,
    getMyReports,
} = require('../controllers/reportController'); 

const { protect } = require('../middleware/authMiddleware'); 

// Public Routes
router.get('/', getReports);
router.get('/:id', getReportById);

router.post('/', protect, createReport);
router.put('/:id', protect, updateReport); 
router.delete('/:id', protect, deleteReport); 
router.get('/my-reports', protect, getMyReports);
module.exports = router;