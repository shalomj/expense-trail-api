import express from 'express';
import { body } from 'express-validator';
import AuthController from '../controllers/AuthController';

const Router: express.Router = express.Router(); 

Router.post(
    '/signup',
    [
        body('firstName')
            .not().isEmpty().withMessage('First name is required')
            .trim()
            .escape(),
        body('lastName')
            .not().isEmpty().withMessage('Last name is required')
            .trim()
            .escape(),
        body('email')
            .isEmail().withMessage('Invalid email address')
            .normalizeEmail(),
        body('password')
            .not().isEmpty().withMessage('Password is required')
            .trim()
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')

    ],
    AuthController.signup
);

Router.post(
    '/login',
    [
        body('email')
            .not().isEmpty().withMessage('Email address is required')
            .isEmail().withMessage('Invalid email address')
            .normalizeEmail(),
        body('password')
            .not().isEmpty().withMessage('Password is required')
            .trim()
    ],
    AuthController.login
);

export default Router;