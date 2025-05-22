// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path'); // Only needed if you plan to serve static files later
const { errorHandler } = require('./middleware/errorHandler'); // assuming you have this file
app.use(errorHandler);

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Body parser for JSON data

// --- DEBUGGING LINES: Check what your route modules are exporting ---
const authRoutesModule = require('./routes/authRoutes');
console.log('DEBUG: Type of authRoutesModule:', typeof authRoutesModule);
console.log('DEBUG: Is authRoutesModule an Express Router:', typeof authRoutesModule === 'function' && authRoutesModule.stack !== undefined);

const reportRoutesModule = require('./routes/reportRoutes');
console.log('DEBUG: Type of reportRoutesModule:', typeof reportRoutesModule);
console.log('DEBUG: Is reportRoutesModule an Express Router:', typeof reportRoutesModule === 'function' && reportRoutesModule.stack !== undefined);
// --- END DEBUGGING LINES ---


// Routes - Use the variables from the debugging section
//app.use('/api/auth', authRoutesModule);
//app.use('/api/reports', reportRoutesModule);
// Add other routes as you create them

// Basic route for testing server
app.get('/', (req, res) => {
    res.send('Urban Marine Reporting API is running...');
});

// --- Error Handling Middleware (should be last middleware) ---
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(err.statusCode || 500).json({
        message: err.message || 'Server Error',
        // In production, you might want to send a generic error message
        // error: process.env.NODE_ENV === 'development' ? err : {}
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});