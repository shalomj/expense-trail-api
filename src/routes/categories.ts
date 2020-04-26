import express from 'express';
import auth from '../middlewares/auth';
import CategoryController from '../controllers/CategoryController';

const Router: express.Router = express.Router();

Router.get('/', auth, CategoryController.fetchAll);
Router.get('/:id', auth, CategoryController.fetch);

export default Router;