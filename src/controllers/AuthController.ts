import { Request, Response } from 'express';
import { validationResult, Result as ValidationError } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserInterface } from '../models/User';
import AuthInterface from '../utils/auth';

const JWT_ACCESS_TOKEN_SECRET: string = (process.env.JWT_ACCESS_TOKEN_SECRET as string);

const AuthController = {

    signup: async (req: Request, res: Response) => {
        // Check for errors
        const errors: ValidationError = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400)
                .json({
                    status: 'failed',
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
            let user: UserInterface|null = await User.findOne({ email });

            if (user) {
                return res.status(200).json({
                    status: 'failed',
                    message: "An account with that email address already exists. Please login to continue."
                });
            }

            const hashedPassword: string = await bcrypt.hash(password, 10);

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
            res.status(500).json({
                status: 'failed',
                message: "Unable to process request"
            });
        }
    },

    login: async (req: Request, res: Response) => {
        // Check for errors
        const errors: ValidationError = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400)
                .json({
                    status: 'failed',
                    errors: errors.array()
                });
        }

        const { email, password } = req.body;
        const defaultError: string = 'Invalid email address or password';

        try {
            const user: UserInterface|null = await User.findOne({ email });

            if (!user) {
                return res.status(200)
                    .json({
                        status: 'failed',
                        message: defaultError
                    });
            }

            const isValidPassword: boolean = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return res.status(200)
                    .json({
                        status: 'failed',
                        message: defaultError
                    });
            }

            const payload: AuthInterface = {
                _id: user._id
            };

            jwt.sign(
                payload,
                JWT_ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '24h'
                },
                (err, token) => {
                    if (err) throw err;

                    res.status(200)
                        .json({
                            status: 'success',
                            data: {
                                accessToken: token
                            }
                        });
                }
            );
        } catch (err) {
            res.status(500).json({
                status: 'failed',
                message: "Unable to process request"
            });
        }
    }
};

export default AuthController;