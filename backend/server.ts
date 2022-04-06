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
import {publicRoute} from "./routes/route";
import {getAllRoutes} from "./spec/generation";
import * as util from "util";

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
app.use('/constant', constantRoute)

app.get("/routes", publicRoute(async (req, res)=>{
    let routes = [];
    let counter = 0;
    app._router.stack.forEach(function(middleware) {
        let regexp = middleware.regexp.toString();
        regexp = regexp.slice(3);
        const index = regexp.indexOf('/?(');
        regexp = regexp.slice(0, index - 1);

        if (middleware.route) {
            routes.push({ child: middleware.route.path, parent: regexp });
        } else if (middleware.name === 'router') {
            middleware.handle.stack.forEach(function(handler) {
                counter++;

                if (counter % 2 === 1) {
                    return;
                }
                let route = handler.route;
                const methods = []
                for (let method in route.methods) {
                    if(route.methods[method]){
                        methods.push(method)
                    }
                }
                console.log(util.inspect(route.stack[0].handle))
                route && routes.push({ child: route.path, parent: regexp,
                methods: methods});
            });
        }
    });

    res.send(routes)
}))


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