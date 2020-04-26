import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { Category, CategoryInterface } from '../models/Category';
import AuthInterface from '../utils/auth';

interface CategoryFilterInterface extends FilterQuery<Object> {
    _id?: string, 
    type?: string, 
};

const CategoryController = {

    fetchAll: async (req: Request, res: Response) => {
        try {
            const filter: CategoryFilterInterface = {};

            if (req.query._type) {
                filter.type = (req.query._type as string);
            }

            const limit: number = Number(req.query._limit) || 10;

            const categories: CategoryInterface[]|null = await Category
                .find(filter, '-__v')
                .limit(limit);

            res.status(200)
                .json({
                    status: 'success',
                    data: categories
                });
        } catch (err) {
            res.status(422)
                .json({
                    status: 'failed',
                    message: "Unable to load categories"
                });
        }
    },

    fetch: async (req: Request, res: Response) => {
        try {
            const category: CategoryInterface|null = await Category.findById(req.params.id, '-__v');

            res.status(200)
                .json({
                    status: 'success',
                    data: category
                });
        } catch (err) {
            res.status(404)
                .json({
                    status: 'failed',
                    message: "Category not found"
                });
        }
    }
};

export default CategoryController;