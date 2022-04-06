import express from 'express';
import * as bodyParser from "body-parser";
import connectToMongoDB, {MONGO_URI} from "./db/mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import {reviewRouter} from "./routes/review";
import {userRouter} from "./routes/user";
import {recipeRouter} from "./routes/recipe";
import cors from 'cors';
import {fileRouter} from "./routes/file";
import {Role, User} from "./models/user";
import {constantRoute} from "./routes/constants";

export const BASE_URL = process.env.BASE_URL ?? "http://localhost:8000"

console.log("Starting")
connectToMongoDB().catch(err => console.log(err))

const options: cors.CorsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",")
        : ['http://localhost:3000'],
    credentials: true
};

console.log(options)

export const app = express()
app.use(cors(options))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(
    session({
        secret: process.env.SESSION_SECRET || "V^FTpiZvvFmPfX6RLcz", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 2e+7,
            httpOnly: true,
            secure: false
        },
        // store the sessions on the database in production
        store: MongoStore.create({
            mongoUrl: MONGO_URI
        })
    })
);

app.use('/review', reviewRouter)
app.use('/user', userRouter)
app.use('/recipe', recipeRouter)
app.use('/file', fileRouter)
app.use('/constant', constantRoute)


export async function createUserIfNotExist(email: string, name: string, password: string, role: Role) {
    const preUser = await User.findByEmailName(email, name)
    if (!preUser) {
        console.log(`Creating default user: ${name}`)
        let user = new User({
            name: name,
            email: email,
            password: password,
            role: role
        })
        await user.save()
    }
}

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});

const setup = async () => {
    await createUserIfNotExist("admin@admin.com", "admin", "admin", Role.ADMIN)
    await createUserIfNotExist("user@example.com", "user", "user", Role.USER)
    await createUserIfNotExist("user1@example.com", "user1", "user1", Role.USER)
    await createUserIfNotExist("user2@example.com", "user2", "user2", Role.USER)
}
setup().then()