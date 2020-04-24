const { validationResult } = require('express-validator');
const Category = require('../models/Category');
const Transaction = require('../models/Transaction');

const TransactionsController = {

    fetchAll: async (req, res) => {
        try {
            // Get all user transactions with category
            const transactions = await Transaction
                .find(
                    { user: req.user.id },
                    '-__v'
                )
                .populate('category', 'name type');

            res.status(200)
                .json({
                    status: 'success',
                    data: transactions
                });
        } catch (err) {
            console.log(err.message);

            res.status(500)
                .json({
                    status: 'failed',
                    message: 'Unable to process request'
                });
        }
    },

    fetch: async (req, res) => {
        try {
            // Find user transaction with category
            const transaction = await Transaction
                .findOne(
                    {
                        user: req.user.id,
                        _id: req.params.id
                    },
                    '-__v'
                )
                .populate('category', 'name type');

            if (!transaction) {
                return res.status(404)
                    .json({
                        status: 'failed',
                        message: 'Transaction not found'
                    });
            }

            res.status(200)
                .json({
                    status: 'success',
                    data: transaction
                });
        } catch (err) {
            console.log(err.message);

            res.status(500)
                .json({
                    status: 'failed',
                    message: 'Unable to process request'
                });
        }
    },

    create: async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400)
                .json({
                    status: 'failed',
                    errors: errors.array()
                });
        }

        const user = req.user;
        const { category, memo, logDate, amount, type } = req.body;

        try {
            // Find selected category
            const selectedCategory = await Category.findById(category);

            if (!selectedCategory) {
                return res.status(404)
                    .json({
                        status: 'failed',
                        message: 'Category not found'
                    });
            }

            let transaction = new Transaction({
                user: user.id,
                category: selectedCategory._id,
                memo, 
                logDate, 
                amount,
                type
            });

            transaction = await transaction.save();

            if (!transaction) {
                return res.status(422)
                    .json({
                        status: 'failed',
                        message: 'Unable to save transaction'
                    });
            }

            res.status(201)
                .json({
                    status: 'success',
                    data: transaction
                });
        } catch (err) {
            console.log(err.message);

            res.status(500)
                .json({
                    status: 'failed',
                    message: 'Unable to process request'
                });
        }
    },

    update: async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400)
                .json({
                    status: 'failed',
                    errors: errors.array()
                });
        }

        const { category, memo, logDate, amount, type } = req.body;

        console.log(req.user.id);

        try {
            // Find user transaction
            let transaction = await Transaction.findOne({ user: req.user.id, _id: req.params.id });

            if (!transaction) {
                return res.status(404)
                    .json({
                        status: 'failed',
                        message: 'Transaction not found'
                    });
            }

            // Find selected category
            const selectedCategory = await Category.findById(category);

            if (!selectedCategory) {
                return res.status(404)
                    .json({
                        status: 'failed',
                        message: 'Category not found'
                    });
            }

            transaction.category = selectedCategory._id;
            transaction.memo = memo;
            transaction.logDate = logDate;
            transaction.amount = amount;
            transaction.type = type;
            transaction.updatedAt = Date.now();

            transaction = await transaction.save();

            res.status(200)
                .json({
                    status: 'success',
                    data: transaction
                });
        } catch (err) {
            console.log(err.message);

            res.status(500)
                .json({
                    status: 'failed',
                    message: 'Unable to process request'
                });
        }
    },

    delete: async (req, res) => {
        try {
            const transaction = await Transaction.findOne({ user: req.user.id, _id: req.params.id });

            if (!transaction) {
                return res.status(404)
                    .json({
                        status: 'failed',
                        message: 'Transaction not found'
                    });
            }

            await transaction.remove();

            res.status(204)
                .json({
                    status: 'success',
                    message: 'Transaction has been successfully deleted'
                });
        } catch (err) {
            console.log(err.message);

            res.status(500)
                .json({
                    status: 'failed',
                    message: 'Unable to process request'
                });
        }
    }
};

module.exports = TransactionsController;
