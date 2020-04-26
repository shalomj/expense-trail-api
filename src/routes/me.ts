import express from 'express';
import auth from '../middlewares/auth';
import MeController from '../controllers/MeController';

const Router: express.Router = express.Router();

Router.get('/', auth, MeController.fetch);

export default Router;
