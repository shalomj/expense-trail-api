import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { Category } from '../models/Category';

/**
 * Make any changes you need to make to the database here
 */
export async function up(): Promise<void> {
    const dataPath: string = path.join(path.dirname(__dirname), 'data', 'categories.json');

    const jsonData: string = fs.readFileSync(dataPath).toString();

    const categoriesData = JSON.parse(jsonData);

    try {
        await Category.insertMany(categoriesData);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down(): Promise<void> {
    try {
        await Category.deleteMany({});
    } catch (err) {
        console.log(err);
    }
}
