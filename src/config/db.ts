import mongoose from 'mongoose';
import { config } from './config';

mongoose.set('strictQuery', true);
export async function databaseConnect() {

    const db = config.dbURI;

    try {
        await mongoose.connect(db);
    } catch (error) {
        console.log(error);
    }
}
