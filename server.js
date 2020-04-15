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

app.get('/', (req, res) => {
    res.send('Expense Trail API');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
