const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');
const Category = require('../models/Category');

/**
 * Make any changes you need to make to the database here
 */
async function up() {
    const dataPath = path.join(path.dirname(__dirname), 'data', 'categories.json');

    const categoriesData = JSON.parse(fs.readFileSync(dataPath));

    try {
        await this('category').insertMany(categoriesData);
    } catch (err) {
        logger(err);
    }
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
    console.log(this);

    try {
        await this('category').deleteMany({});
    } catch (err) {
        logger(err);
    }
}

module.exports = { up, down };
