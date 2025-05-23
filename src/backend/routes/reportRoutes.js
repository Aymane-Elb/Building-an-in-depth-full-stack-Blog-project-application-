const express = require('express');
const router = express.Router();
const {
    getReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport,
    getMyReports
} = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); 


router.route('/')
    .get(getReports); 

router.route('/:id')
    .get(getReportById); 

//router.use(protect); // This is likely line 23 if you started counting from the top of the file

router.route('/')
    .post(upload.array('images', 3), createReport); // POST /api/reports - Create a new report
                                                  // 'images' is the name of the file input field on the frontend
                                                  // '3' is the maximum number of images allowed for this upload

router.route('/my-reports')
    .get(getMyReports); // GET /api/reports/my-reports - Get reports submitted by the authenticated user

/*router.route('/:id')
    .put(updateReport) // PUT /api/reports/:id - Update a report (can be done by reporter or admin)
    .delete(authorize('admin'), deleteReport); // DELETE /api/reports/:id - Delete a report (only by admin)*/

module.exports = router;