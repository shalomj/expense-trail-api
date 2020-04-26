const express = require('express');
const Router = express.Router();
const auth = require('../middlewares/auth');
const CategoryController = require('../controllers/CategoryController.js');

Router.get('/', auth, CategoryController.fetchAll);
Router.get('/:id', auth, CategoryController.fetch);

module.exports = Router;