const User = require('../models/User');

const MeController = {

    fetch: async (req, res) => {
        try {
            const user = await User.findById(req.user.id, '-password -__v');

            if (!user) {
                return res.status(404)
                    .json({
                        status: 'failed',
                        message: 'User not found'
                    });
            }

            res.status(200)
                .json({
                    status: 'success',
                    data: user
                });
        } catch (err) {
            console.log(err.message);

            res.status(500).json({
                status: 'failed',
                message: "Unable to process request"
            });
        }
    }
};

module.exports = MeController;