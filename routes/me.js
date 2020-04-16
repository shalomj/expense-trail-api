const express = require('express');
const Router = express.Router();
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const MeController = require('../controllers/MeController');
const MeTransactionsController = require('../controllers/MeTransactionsController');

Router.get('/', auth, MeController.fetch);

// Transactions
const transactionValidation = [
    body('category')
        .not().isEmpty().withMessage('Category is required')
        .trim()
        .escape(),
    body('memo')
        .not().isEmpty().withMessage('Memo is required')
        .trim()
        .escape(),
    body('amount')
        .not().isEmpty().withMessage('Amount is required')
        .isNumeric().withMessage('Invalid amount')
];

Router.get('/transactions', auth, MeTransactionsController.fetchAll);
Router.get('/transactions/:id', auth, MeTransactionsController.fetch);
Router.post(
    '/transactions',
    auth,
    transactionValidation,
    MeTransactionsController.create
);
Router.patch(
    '/transactions/:id',
    auth,
    transactionValidation,
    MeTransactionsController.update
);
Router.delete(
    '/transactions/:id',
    auth,
    MeTransactionsController.delete
);

module.exports = Router;
