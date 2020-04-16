const express = require('express');
const dotenv = require('dotenv');
const DB = require('./db');

// Routes
const categoriesRoute = require('./routes/categories');
const authRoute = require('./routes/auth');

// Init environment config
dotenv.config();

// Connect to the database
DB.init().connect();

// Setup Express server
const app = express();

// Middleware to parse request payload to JSON
app.use(express.json());

// API routes
app.use('/api/v1/categories', categoriesRoute);
app.use('/api/v1/auth', authRoute);

// 404 Not Found handler
app.use((req, res, next) => {
    next({
        status: 404,
        message: '404 Not Found'
    });
});

// Default error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            status: "failed",
            message: err.message
        });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
