/*
 * Copyright 2022 Dan Lyu
 */

import {requireObjectIdFromPara, idToObjectId} from "../utils/util";
import {Recipe} from "../models/recipe";
import {Review} from "../models/review";
import express from "express";
import {userRoute} from "./route";
import {Role} from "../models/user";

export const reviewRouter = express.Router()


reviewRouter.delete('/:id', userRoute(async (req, res, user) => {
    const reviewId = requireObjectIdFromPara(req)
    let review = await Review.findById(reviewId)
    if (!review) {
        res.status(404).send("Review not found")
        return
    }
    if (review.author !== req.session.user!._id && user!.role < Role.ADMIN) {
        res.status(401).send("You don't have permission to edit this review")
        return
    }
    await review.delete()
    res.send("deleted")
}))


reviewRouter.patch('/:id', userRoute(async (req, res, user) => {
    const reviewId = requireObjectIdFromPara(req)
    let review = await Review.findById(reviewId)
    if (!review) {
        res.status(404).send("Review not found")
        return
    }
    if (review.author !== req.session.user!._id && user!.role < Role.ADMIN) {
        res.status(401).send("You don't have permission to edit this review")
        return
    }
    review.title = req.body.title ?? review.title
    review.content = req.body.content ?? review.content
    review.rating = req.body.rating ?? review.rating
    review = await review.save()
    res.send(review)
}))

reviewRouter.post('/', userRoute(async (req, res) => {
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

reviewRouter.get('/', userRoute(async (req, res) => {
    res.send(await Review.find({author: req.session.user!._id}))
}))


reviewRouter.get('/recipe/:id', userRoute(async (req, res) => {
    const id = requireObjectIdFromPara(req)
    res.send(await Review.find({reviewedRecipe: id}))
}))

reviewRouter.get('/user/:id', userRoute(async (req, res) => {
    const id = requireObjectIdFromPara(req)
    res.send(await Review.find({author: id}))
}))

