const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Expense Trail API');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
