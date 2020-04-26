import mongoose, { Document, Schema } from 'mongoose';

export interface TransactionInterface extends Document {
    user: string, 
    category: string, 
    memo: string, 
    logDate: string, 
    amount: number, 
    type: string, 
    createdAt: string|number, 
    updatedAt: string|number
};

const TransactionSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    memo: {
        type: String,
        required: true
    },
    logDate: {
        type: Date
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export const Transaction = mongoose.model<TransactionInterface>('transaction', TransactionSchema, 'transactions');