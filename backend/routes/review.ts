/*
 * Copyright 2022 Dan Lyu
 */

import {getObjectIdFromPara, idToObjectId} from "../utils/util";
import {Recipe} from "../models/recipe";
import {Review} from "../models/review";
import express from "express";
import {route} from "./route";

export const reviewRouter = express.Router()

reviewRouter.patch('/:id', route(async (req, res) => {
    const reviewId = getObjectIdFromPara(req)
    let review = await Review.findById(reviewId)
    if (!review) {
        res.status(404).send("Review not found")
        return
    }
    if (review.author !== req.session.user!._id && !req.session.user){
        res.status(401).send("You don't have permission to edit this review")
        return
    }
    review.title = req.body.title ?? review.title
    review.content = req.body.content ?? review.content
    review.rating = req.body.rating ?? review.rating
    review = await review.save()
    res.send(review)
}))

reviewRouter.post('/', route(async (req, res) => {
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
    res.send(await Review.find({author: req.session.user!._id}))
}))


reviewRouter.get('/recipe/:id', route(async (req, res) => {
    const id = getObjectIdFromPara(req)
    res.send(await Review.find({reviewedRecipe: id}))
}))

reviewRouter.get('/user/:id', route(async (req, res) => {
    const id = getObjectIdFromPara(req)
    res.send(await Review.find({author: id}))
}))

