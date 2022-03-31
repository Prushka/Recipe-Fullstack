/*
 * Copyright 2022 Dan Lyu
 */

import {getObjectIdFromPara, userHasEditingPermissionOnRecipe} from "../utils/util";
import {Role} from "../models/user";
import {Recipe} from "../models/recipe";
import express from "express";
import {route} from "./route";

const {ObjectId} = require('mongodb');

export const recipeRouter = express.Router();
recipeRouter.delete('/:id', route(async (req, res, user) => {
    const id = getObjectIdFromPara(req)
    let recipe = await Recipe.findById(id)
    if (recipe) {
        if (!userHasEditingPermissionOnRecipe(user!, recipe)) {
            res.status(401).send("You don't have permission to edit this recipe")
            return
        }
        recipe = await recipe.delete()
        res.send(recipe)
    } else {
        res.status(404).send("Recipe not found")
    }
}))

recipeRouter.patch('/:id', route(async (req, res, user) => {
    const id = getObjectIdFromPara(req)
    let recipe = await Recipe.findById(id)
    if (recipe) {
        if (!userHasEditingPermissionOnRecipe(user!, recipe)) {
            res.status(401).send("You don't have permission to edit this recipe")
            return
        }
        recipe.title = req.body.title ?? recipe.title
        recipe.content = req.body.content ?? recipe.content
        recipe.category = req.body.category ?? recipe.category
        recipe.tags = req.body.tags ?? recipe.tags
        if (user!.role > Role.USER) {
            recipe.approved = req.body.approved ?? recipe.approved
        }
        recipe = await recipe.save()
        res.send(recipe)
    } else {
        res.status(404).send("Recipe not found")
    }
}))

recipeRouter.post('/', route(async (req, res) => {
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

recipeRouter.get('/me', route(async (req, res) => {
    const id = ObjectId(req.session.user!._id)
    res.send(await Recipe.findRecipeByUser(id))
}))

recipeRouter.get('/:id', route(async (req, res) => {
        const id = getObjectIdFromPara(req)
        res.send(await Recipe.findRecipeByUser(id))
    }, {required: false})
)

recipeRouter.get('/', route(async (req, res) => {
    res.send(await Recipe.find())
}, {required: false}))