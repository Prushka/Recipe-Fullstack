import {connect} from 'mongoose';

export const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/RecipeAPI'
export default async function connectToMongoDB() {
    await connect(connectionString);
}