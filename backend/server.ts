import express from 'express';
import * as bodyParser from "body-parser";
import connectToMongoDB, {MONGO_URI} from "./db/mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import {createAdminIfNotExist} from "./utils/util";
import {reviewRouter} from "./routes/review";
import {userRouter} from "./routes/user";
import {recipeRouter} from "./routes/recipe";
import cors from 'cors';
import {fileRouter} from "./routes/file";

export const BASE_URL = process.env.BASE_URL ?? "http://localhost:8000"

console.log("Starting")
connectToMongoDB().catch(err => console.log(err))

const options: cors.CorsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",")
        : ['http://localhost:3000', 'https://react.muddy.ca'],
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
            maxAge: 3.6e+6,
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


const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});
createAdminIfNotExist().then()