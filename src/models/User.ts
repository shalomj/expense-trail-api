import mongoose, { Document, Schema } from 'mongoose';

export interface UserInterface extends Document {
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string, 
    emailVerified: boolean, 
    createdAt: string|number, 
    updatedAt: string|number
}

const UserSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    emailVerified: {
        type: Boolean
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

export const User = mongoose.model<UserInterface>('user', UserSchema);