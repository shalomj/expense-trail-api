const express = require('express');
const Router = express.Router();
const CategoryController = require('../controllers/CategoryController.js');

Router.get('/', CategoryController.fetchAll);
Router.get('/:id', CategoryController.fetch);

module.exports = Router;