import { Schema, model } from 'mongoose';
import connectMongo from "../db/mongoose";

interface User {
    name: string;
    email: string;
    avatar?: string;
}

const schema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String
});

const UserModel = model<User>('User', schema);

connectMongo().catch(err => console.log(err));
