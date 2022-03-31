import express, {Request, Response} from 'express';
import * as bodyParser from "body-parser";
import {IUser, Role, User} from "./models/user";
import connectToMongoDB from "./db/mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import {Recipe} from "./models/recipe";
import {genericValidationInternal, getObjectIdFromPara, validateUser} from "./utils/util";

const {ObjectId} = require('mongodb');
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


app.patch('/recipe/:id', async (req: Request, res: Response) => {
    const id = getObjectIdFromPara(req, res)
    if (!validateUser(req, res) || !id) {
        return
    }
    try {
        const user: IUser = req.session.user
        let recipe = await Recipe.findById(id)
        if (recipe) {
            if (recipe.author != req.session.user._id && user.role < 1) {
                res.status(401).send("You don't have permission to edit this recipe")
                return
            }
            recipe.title = req.body.title ?? recipe.title
            recipe.content = req.body.content ?? recipe.content
            recipe.category = req.body.category ?? recipe.category
            recipe = await recipe.save()
            res.send(recipe)
        } else {
            res.status(404).send("Recipe not found")
        }
    } catch (e) {
        genericValidationInternal(res, e)
    }
})

app.post('/recipe', async (req: Request, res: Response) => {
    if (!validateUser(req, res)) {
        return
    }
    try {
        let recipe = new Recipe({
            title: req.body.title,
            category: req.body.category,
            content: req.body.content,
            author: req.session.user._id,
            tags: req.body.tags
        })
        recipe = await recipe.save()
        res.send(recipe)
    } catch (e) {
        genericValidationInternal(res, e)
    }
})

app.get('/recipe/me', async (req: Request, res: Response) => {
    if (!validateUser(req, res)) {
        return
    }
    const id = ObjectId(req.session.user._id)
    res.send(await Recipe.findRecipeByUser(id))
})

app.get('/recipe/:id', async (req: Request, res: Response) => {
    const id = getObjectIdFromPara(req, res)
    if (!id) {
        return
    }
    res.send(await Recipe.findRecipeByUser(id))
})

app.get('/recipe', async (req: Request, res: Response) => {
    if (!validateUser(req, res)) {
        return
    }
    res.send(await Recipe.find())
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
    user.password = ''
    req.session.user = user
    res.send(user)
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
        genericValidationInternal(res, e)
    }
});

const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});
