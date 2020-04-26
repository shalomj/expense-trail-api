import mongoose, { Document, Schema } from 'mongoose';

export interface CategoryInterface extends Document {
    name: string, 
    type: string, 
    createdAt: string, 
    updatedAt: string
};

const CategorySchema: Schema = new Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
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

export const Category = mongoose.model<CategoryInterface>('category', CategorySchema, 'categories');