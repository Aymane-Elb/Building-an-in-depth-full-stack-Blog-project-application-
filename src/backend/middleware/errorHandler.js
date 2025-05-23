// src/backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    // Determine the status code: if it's 200 (OK) then it's a server error (500), otherwise use the status code set by the controller
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message: err.message,
        // Only include stack trace in development mode for debugging
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
};

module.exports = errorHandler;