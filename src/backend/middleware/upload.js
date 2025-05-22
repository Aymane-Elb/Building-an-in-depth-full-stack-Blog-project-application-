// src/backend/middleware/upload.js
const multer = require('multer');

// Configure Multer storage
const storage = multer.memoryStorage(); // Using memory storage to handle files as buffers

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.mimetype.match(/image\/(jpeg|jpg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
});

module.exports = upload; // <--- This line is critical!