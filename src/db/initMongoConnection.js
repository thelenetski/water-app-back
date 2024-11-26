import mongoose from 'mongoose';

export const initMongoConnection = async () => {
    try {
        const user = process.env.MONGODB_USER;
        const password = process.env.MONGODB_PASSWORD;
        const url = process.env.MONGODB_URL;
        const db = process.env.MONGODB_DB;

        await mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority`);

        console.log('Connected to DB!');
    } catch (err) {
        console.log('Error while setting up mongo connection', err);
        throw err;
    }
};