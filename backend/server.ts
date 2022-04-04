import express from 'express';
import * as bodyParser from "body-parser";
import connectToMongoDB from "./db/mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import {createAdminIfNotExist} from "./utils/util";
import {reviewRouter} from "./routes/review";
import {userRouter} from "./routes/user";
import {recipeRouter} from "./routes/recipe";
import cors from 'cors';

console.log("Starting")
connectToMongoDB().catch(err => console.log(err))

const options: cors.CorsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : ['http://localhost:3000']
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
            httpOnly: true
        },
        // store the sessions on the database in production
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/RecipeAPI'
        })
    })
);

app.use('/review', reviewRouter)
app.use('/user', userRouter)
app.use('/recipe', recipeRouter)


const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});
createAdminIfNotExist().then()