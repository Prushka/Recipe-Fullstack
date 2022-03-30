import * as mongoose from "mongoose";

export default async function connectMongo() {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/RecipeAPI');
}