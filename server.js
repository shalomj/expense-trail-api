const express = require('express');
const dotenv = require('dotenv');
const DB = require('./db');

// Init environment config
dotenv.config();

// Connect to the database
DB.init().connect();

// Setup Express server
const app = express();

// Middleware to parse request payload to JSON
app.use(express.json());

// 404 Not Found handler
app.use((req, res, next) => {
    const err = new Error('404 Not Found');

    err.status = 404;

    next(err);
});

// Default error handler
app.use((err, req, res, next) => {
    res.status = err.status || 500;
    res.send({
        status: "failed",
        message: err.message
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
