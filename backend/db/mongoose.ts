import {connect} from 'mongoose';

export const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/RecipeAPI'
export default async function connectToMongoDB() {
    await connect(MONGO_URI);
}