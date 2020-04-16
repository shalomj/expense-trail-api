const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


const AuthController = {

    signup: async (req, res) => {
        // Check for errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400)
                .json({
                    status: "failed",
                    errors: errors.array()
                });
        }

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        try {
            // Check if email address already exists
            let user = await User.findOne({ email });

            if (user) {
                return res.status(200).json({
                    status: "failed",
                    message: "An account with that email address already exists. Please login to continue."
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                emailVerified: false
            });

            await user.save();

            res.status(201).json({
                status: "success",
                message: "Registration successful"
            });
        } catch (err) {
            console.log(err.message);

            res.status(500).json({
                status: "failed",
                message: "Unable to process request"
            });
        }
    }
};

module.exports = AuthController;