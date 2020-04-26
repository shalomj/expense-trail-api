import express from 'express';
import auth from '../middlewares/auth';
import { body, ValidationChain } from 'express-validator';
import TransactionsController from '../controllers/TransactionsController';

const Router: express.Router = express.Router();

const transactionValidation: ValidationChain[] = [
    body('category')
        .not().isEmpty().withMessage('Category is required')
        .trim()
        .escape(),
    body('memo')
        .not().isEmpty().withMessage('Memo is required')
        .trim()
        .escape(),
    body('logDate')
        .isISO8601().withMessage('Invalid log date')
        .trim()
        .escape(), 
    body('amount')
        .not().isEmpty().withMessage('Amount is required')
        .isNumeric().withMessage('Invalid amount')
];

Router.get('/', auth, TransactionsController.fetchAll);
Router.get('/:id', auth, TransactionsController.fetch);
Router.post('/', auth, transactionValidation, TransactionsController.create);
Router.patch('/:id', auth, transactionValidation, TransactionsController.update);
Router.delete('/:id', auth, TransactionsController.delete);

export default Router;