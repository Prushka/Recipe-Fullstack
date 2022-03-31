import { connect } from 'mongoose';

export default async function connectMongo() {
    await connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/RecipeAPI');
}