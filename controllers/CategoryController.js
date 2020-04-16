const Category = require('../models/Category');

const CategoryController = {

    fetchAll: async (req, res) => {
        try {
            const categories = await Category.find({}, { __v: 0 });

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

    fetch: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id, { __v: 0 });

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

module.exports = CategoryController;