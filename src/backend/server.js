// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Core Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Import Route Modules ---
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes'); // Make sure this is also uncommented if you want report routes working
const errorHandler = require('./middleware/errorHandler');

app.use('/api/auth', authRoutes); // Handles user registration, login, and profile
app.use('/api/reports', reportRoutes); // Handles report creation, retrieval, update, and deletion

// --- Basic Route for Server Health Check ---
app.get('/', (req, res) => {
    res.send('Urban Marine Reporting API is running...');
});

// --- Custom Error Handling Middleware ---
app.use(errorHandler);

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});