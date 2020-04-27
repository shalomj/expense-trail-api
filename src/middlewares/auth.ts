import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthInterface from '../utils/auth';

const JWT_ACCESS_TOKEN_SECRET = (process.env.JWT_ACCESS_TOKEN_SECRET as string);

export default (req: Request, res: Response, next: NextFunction) => {
    const bearer: string|undefined = req.header('authorization');

    if (!bearer) {
        return res.status(401)
            .json({
                status: 'failed',
                message: 'Unable to process request'
            });
    }

    const token: string = bearer.split(' ')[1];

    try {
        jwt.verify(token, JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) throw err;

            const auth = (decoded as AuthInterface);

            res.locals.auth = auth;

            next();
        });
    } catch (err) {
        return res.status(401)
            .json({
                status: 'failed',
                message: 'Unable to process request'
            });
    }
};