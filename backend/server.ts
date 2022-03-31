import express, {Request, Response} from 'express';
import * as bodyParser from "body-parser";
import {IUser, Role, User} from "./models/user";
import connectToMongoDB from "./db/mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import {Recipe} from "./models/recipe";
import {
    updateUser,
    createAdminIfNotExist,
    getObjectIdFromPara, removeFromOutput,
    userHasEditingPermissionOnRecipe,
    validateUser, route, getUserFromSession
} from "./utils/util";
import {reviewRouter} from "./routes/review";
import {userRouter} from "./routes/user";

const {ObjectId} = require('mongodb');
connectToMongoDB().catch(err => console.log(err))

export const app = express()
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
            mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/RecipeAPI'
        })
    })
);

app.use('/review', reviewRouter)
app.use('/user', userRouter)

app.delete('/recipe/:id', route(async (req, res) => {
    const id = getObjectIdFromPara(req)
    validateUser(req)
    const user: IUser = req.session.user!
    let recipe = await Recipe.findById(id)
    if (recipe) {
        if (!userHasEditingPermissionOnRecipe(user, recipe)) {
            res.status(401).send("You don't have permission to edit this recipe")
            return
        }
        recipe = await recipe.delete()
        res.send(recipe)
    } else {
        res.status(404).send("Recipe not found")
    }
}))

app.patch('/recipe/:id', route(async (req, res) => {
    validateUser(req)
    const id = getObjectIdFromPara(req)

    const user: IUser = req.session.user!
    let recipe = await Recipe.findById(id)
    if (recipe) {
        if (!userHasEditingPermissionOnRecipe(user, recipe)) {
            res.status(401).send("You don't have permission to edit this recipe")
            return
        }
        recipe.title = req.body.title ?? recipe.title
        recipe.content = req.body.content ?? recipe.content
        recipe.category = req.body.category ?? recipe.category
        recipe.tags = req.body.tags ?? recipe.tags
        if (user.role > Role.USER) {
            recipe.approved = req.body.approved ?? recipe.approved
        }
        recipe = await recipe.save()
        res.send(recipe)
    } else {
        res.status(404).send("Recipe not found")
    }
}))

app.post('/recipe', route(async (req, res) => {
    validateUser(req)
    let recipe = new Recipe({
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        author: req.session.user!._id,
        tags: req.body.tags
    })
    recipe = await recipe.save()
    res.send(recipe)
}))

app.get('/recipe/me', route(async (req, res) => {
    validateUser(req)
    const id = ObjectId(req.session.user!._id)
    res.send(await Recipe.findRecipeByUser(id))
}))

app.get('/recipe/:id', route(async (req, res) => {
        const id = getObjectIdFromPara(req)
        res.send(await Recipe.findRecipeByUser(id))
    })
)

app.get('/recipe', route(async (req, res) => {
    validateUser(req)
    res.send(await Recipe.find())
}))


const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});
createAdminIfNotExist().then()