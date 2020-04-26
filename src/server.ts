import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Init environment config
dotenv.config({ path: path.resolve(__dirname, '../.env')});

import DB from './db';

// Connect to the database
DB.init().connect();

// Routes
import categoriesRoute from './routes/categories';
import authRoute from './routes/auth';
import meRoute from './routes/me';
import transactionsRoute from './routes/transactions';

// Setup Express server
const app: Application = express();

// CORS middleware
app.use(cors());
// Middleware to parse request payload to JSON
app.use(express.json());

// API routes
app.use('/api/v1/categories', categoriesRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/me', meRoute);
app.use('/api/v1/transactions', transactionsRoute);

// 404 Not Found handler
app.use((req: Request, res: Response, next: NextFunction) => {
    next({
        status: 404,
        message: '404 Not Found'
    });
});

interface AppError {
    status: number, 
    message: string
};

// Default error handler
app.use((err: AppError, req: Request, res: Response) => {
    res.status(err.status || 500)
        .json({
            status: "failed",
            message: err.message
        });
});

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
