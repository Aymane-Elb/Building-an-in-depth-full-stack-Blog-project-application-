const multer = require('multer');

const storage = multer.memoryStorage(); 

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/image\/(jpeg|jpg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
});

module.exports = upload;