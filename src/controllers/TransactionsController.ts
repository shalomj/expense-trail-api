import { Request, Response } from 'express';
import { validationResult, Result as ValidationError } from 'express-validator';
import { Category, CategoryInterface } from '../models/Category';
import { Transaction, TransactionInterface } from '../models/Transaction';
import { FilterQuery } from 'mongoose';

interface TransactionFilterInterface extends FilterQuery<Object> {
    _id?: string, 
    user: string, 
    type?: string, 
};

const TransactionsController = {

    fetchAll: async (req: Request, res: Response) => {
        try {
            const filter: TransactionFilterInterface = {
                user: res.locals.auth._id
            };

            if (req.query._type) {
                filter.type = (req.query._type as string);
            }

            const limit: number = Number(req.query._limit) || 10;

            // Get all user transactions with category
            const transactions: TransactionInterface[] = await Transaction
                .find(filter, '-__v')
                .limit(limit)
                .populate('category', 'name type');

            res.status(200)
                .json({
                    status: 'success',
                    data: transactions
                });
        } catch (err) {
            res.status(500)
                .json({
                    status: 'failed',
                    message: 'Unable to process request'
                });
        }
    },

    fetch: async (req: Request, res: Response) => {
        try {
            // Find user transaction with category
            const filter: TransactionFilterInterface = {
                _id: req.params.id, 
                user: res.locals.auth._id
            };

            const transaction: TransactionInterface|null = await Transaction
                .findOne(filter, '-__v')
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
            res.status(500)
                .json({
                    status: 'failed',
                    message: 'Unable to process request'
                });
        }
    },

    create: async (req: Request, res: Response) => {
        // Check for validation errors
        const errors: ValidationError = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400)
                .json({
                    status: 'failed',
                    errors: errors.array()
                });
        }

        const { category, memo, logDate, amount, type } = req.body;

        try {
            // Find selected category
            const selectedCategory: CategoryInterface|null = await Category.findById(category);

            if (!selectedCategory) {
                return res.status(404)
                    .json({
                        status: 'failed',
                        message: 'Category not found'
                    });
            }

            let transaction: TransactionInterface = new Transaction({
                user: res.locals.auth._id,
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
            res.status(500)
                .json({
                    status: 'failed',
                    message: 'Unable to process request'
                });
        }
    },

    update: async (req: Request, res: Response) => {
        // Check for validation errors
        const errors: ValidationError = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400)
                .json({
                    status: 'failed',
                    errors: errors.array()
                });
        }

        const { category, memo, logDate, amount, type } = req.body;

        try {
            // Find user transaction
            const filter: TransactionFilterInterface = {
                _id: req.params.id, 
                user: res.locals.auth._id
            };

            let transaction: TransactionInterface|null = await Transaction.findOne(filter);

            if (!transaction) {
                return res.status(404)
                    .json({
                        status: 'failed',
                        message: 'Transaction not found'
                    });
            }

            // Find selected category
            const selectedCategory: CategoryInterface|null = await Category.findById(category);

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
            res.status(500)
                .json({
                    status: 'failed',
                    message: 'Unable to process request'
                });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            // Find transaction
            const filter: TransactionFilterInterface = {
                _id: req.params.id, 
                user: res.locals.auth._id
            };

            const transaction: TransactionInterface|null = await Transaction.findOne(filter);

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
            res.status(500)
                .json({
                    status: 'failed',
                    message: 'Unable to process request'
                });
        }
    }
};

export default TransactionsController;
