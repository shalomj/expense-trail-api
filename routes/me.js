const express = require('express');
const Router = express.Router();
const auth = require('../middlewares/auth');
const MeController = require('../controllers/MeController');

Router.get('/', auth, MeController.fetch);

module.exports = Router;