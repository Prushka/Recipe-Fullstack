/*
 * Copyright 2022 Dan Lyu
 */

import {idToObjectId, requireObjectIdFromPara} from "../utils/util";
import {IReview, Review} from "../models/review";
import express from "express";
import {userRoute} from "./route";
import {IUser, Role} from "../models/user";
import {ObjectId as ObjectIdType} from "mongoose";
import {EndpointError, throwError} from "../errors/errors";

const {ObjectId} = require('mongodb');

export const reviewRouter = express.Router()

async function requireReviewFromId(id: ObjectIdType): Promise<IReview> {
    const review = await Review.findById(id)
    if (!review) {
        throwError(EndpointError.ReviewNotFound)
    }
    return review!
}

function requireReviewEdit(actor: IUser, review: IReview) {
    if (review.author !== actor._id && actor.role < Role.ADMIN) {
        throwError(EndpointError.NoPermission)
    }
}

reviewRouter.post('/vote/:id', userRoute(async (req, res, sessionUser) => {
    const reviewId = requireObjectIdFromPara(req)
    await requireReviewFromId(reviewId)
    const reviewVote = {
        positivity: req.body.positivity ?? 0,
        author: sessionUser._id
    }
    const review = await Review.findByIdAndUpdate(
        reviewId,
        {$addToSet: {userVotes: reviewVote}},
        {new: true})
    res.send(review)
}))

reviewRouter.delete('/:id', userRoute(async (req, res, sessionUser) => {
    const reviewId = requireObjectIdFromPara(req)
    let review = await requireReviewFromId(reviewId)
    requireReviewEdit(sessionUser, review)
    await review.delete()
    res.send("deleted")
}))

reviewRouter.patch('/:id', userRoute(async (req, res, sessionUser) => {
    const reviewId = requireObjectIdFromPara(req)
    let review = await requireReviewFromId(reviewId)
    requireReviewEdit(sessionUser, review)
    review.content = req.body.content ?? review.content
    review.rating = req.body.rating ?? review.rating
    review = await review.save()
    res.send(review)
}))

reviewRouter.post('/', userRoute(async (req, res) => {
    const id = idToObjectId(req.body.reviewedRecipe)
    await requireReviewFromId(id)
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

