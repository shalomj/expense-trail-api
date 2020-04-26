import { Request, Response } from "express";
import { User, UserInterface } from '../models/User';

const MeController = {

    fetch: async (req: Request, res: Response) => {
        try {
            const user: UserInterface|null = await User.findById(res.locals.auth._id, '-password -__v');

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
            res.status(500).json({
                status: 'failed',
                message: "Unable to process request"
            });
        }
    }
};

export default MeController;