/*
 * Copyright 2022 Dan Lyu
 */

import {getObjectIdFromPara, idToObjectId, route, validateUser} from "../utils/util";
import {Recipe} from "../models/recipe";
import {Review} from "../models/review";
import express from "express";

export const reviewRouter = express.Router()

reviewRouter.post('/', route(async (req, res) => {
    validateUser(req)
    const recipeId = idToObjectId(req.body.reviewedRecipe)
    const recipe = await Recipe.findById(recipeId)
    if (!recipe) {
        res.status(404).send("Recipe not found")
        return
    }
    const preReview = await Review.findOne({author: req.session.user!._id})
    if (preReview) {
        res.status(400).send("You already have one review on this recipe (you can update it tho)")
        return
    }
    let review = new Review({
        title: req.body.title,
        content: req.body.content,
        reviewedRecipe: req.body.reviewedRecipe,
        rating: req.body.rating,
        author: req.session.user!._id
    })
    review = await review.save()
    res.send(review)
}))

reviewRouter.get('/', route(async (req, res) => {
    validateUser(req)
    res.send(await Review.find({author: req.session.user!._id}))
}))


reviewRouter.get('/recipe/:id', route(async (req, res) => {
    validateUser(req)
    const id = getObjectIdFromPara(req)
    res.send(await Review.find({reviewedRecipe: id}))
}))

reviewRouter.get('/user/:id', route(async (req, res) => {
    validateUser(req)
    const id = getObjectIdFromPara(req)
    res.send(await Review.find({author: id}))
}))

