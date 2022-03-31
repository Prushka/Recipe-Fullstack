import express, {Request, Response} from 'express';
import * as bodyParser from "body-parser";
import {User} from "./models/recipe";
import connectToMongoDB from "./db/mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";

connectToMongoDB().catch(err => console.log(err))

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(
    session({
        secret: process.env.SESSION_SECRET || "V^FTpiZvvFmPfX6RLcz", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000,
            httpOnly: true
        },
        // store the sessions on the database in production
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/StudentAPI'
        })
    })
);

function isValidationError(error: Error) {
    return error.name === "ValidationError"
}

function serverError(res: Response) {
    res.status(500).send("Internal Server Error")
}

app.get('/recipes', async (req: Request, res: Response) => {
    if (!req.session.user) {
        res.status(401).send("Unauthorized")
        return
    }
    res.send(req.session.email)
})

app.post("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

app.post('/login', async (req: Request, res: Response) => {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findByEmailPassword(email, password)
    if (!user) {
        res.status(400).send("Invalid")
        return
    }
    req.session.user = user._id
    req.session.email = user.email
    res.send("Success")
});

app.post('/register', async (req: Request, res: Response) => {
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password
    const preUser = await User.findByEmailName(email, name)
    if (preUser) {
        res.status(400).send("User exists (same email or same name)")
        return
    }
    try {
        let user = new User({
            name: req.body.name,
            email: email,
            avatar: req.body.avatar,
            password: password
        })
        user = await user.save()
        res.send(user)
    } catch (e) {
        if (e instanceof Error && isValidationError(e)) {
            res.status(400).send(e.message)
        } else {
            serverError(res)
        }
    }
});

const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});
