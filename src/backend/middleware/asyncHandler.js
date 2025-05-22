// src/backend/middleware/asyncHandler.js
// A simple wrapper to catch errors in async express routes without try/catch in every route
const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;