const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message: err.message,
        // Only include stack trace in development mode for debugging
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
};

module.exports = errorHandler;