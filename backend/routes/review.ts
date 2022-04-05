/*
 * Copyright 2022 Dan Lyu
 */

import {requireIdAsObjectId, requireObjectIdFromPara} from "../utils/util";
import {IReview, Review} from "../models/review";
import express from "express";
import {adminRoute, publicRoute, userRoute} from "./route";
import {IUser, Role, SessionUser, User} from "../models/user";
import {ObjectId as ObjectIdType} from "mongoose";
import {EndpointError, throwError} from "../errors/errors";
import {requireRecipeFromId} from "./recipe";
import {IRecipe} from "../models/recipe";

const {ObjectId} = require('mongodb');

export const reviewRouter = express.Router()

export async function requireReviewFromId(id: ObjectIdType): Promise<IReview> {
    const review = await Review.findById(id)
    if (!review) {
        throwError(EndpointError.ReviewNotFound)
    }
    return review!
}

function requireReviewEdit(actor: SessionUser, review: IReview) {
    if (review.author !== actor._id && actor.role < Role.ADMIN) {
        throwError(EndpointError.NoPermission)
    }
}

reviewRouter.delete('/report/:id', userRoute(async (req, res, sessionUser) => {
    const reviewId = requireObjectIdFromPara(req)
    let review = await requireReviewFromId(reviewId)
    review = (await Review.findByIdAndUpdate(
        review._id,
        {$pull: {inappropriateReportUsers: sessionUser._id}},
        {new: true}))!
    res.send(getOutputReview(review))
}))

reviewRouter.post('/report/:id', userRoute(async (req, res, sessionUser) => {
    const reviewId = requireObjectIdFromPara(req)
    let review = await requireReviewFromId(reviewId)
    review = (await Review.findByIdAndUpdate(
        review._id,
        {$addToSet: {inappropriateReportUsers: sessionUser._id}},
        {new: true}))!
    res.send(getOutputReview(review))
}))

// upsert
reviewRouter.post('/vote/:id', userRoute(async (req, res, sessionUser) => {
    const reviewId = requireObjectIdFromPara(req)
    let review = await requireReviewFromId(reviewId)
    // add to set doesn't trigger mongoose validation
    const prevVote = review.userVotes.find(v => {
        return v.author == sessionUser._id
    })
    const voteIn = {
        positivity: req.body.positivity ?? 0,
        author: sessionUser._id
    }
    if (prevVote) {
        prevVote.positivity = voteIn.positivity ?? prevVote.positivity
    } else {
        review.userVotes.push(voteIn)
    }
    review = await review.save()
    res.send(getOutputReview(review))
}))

reviewRouter.delete('/:id', userRoute(async (req, res, sessionUser) => {
    const reviewId = requireObjectIdFromPara(req)
    let review = await requireReviewFromId(reviewId)
    requireReviewEdit(sessionUser, review)
    await review.delete()
    res.send(getOutputReview(review))
}))

// update review by review id
reviewRouter.patch('/:id', userRoute(async (req, res, sessionUser) => {
    const reviewId = requireObjectIdFromPara(req)
    let review = await requireReviewFromId(reviewId)
    requireReviewEdit(sessionUser, review)
    review.content = req.body.content ?? review.content
    review.rating = req.body.rating ?? review.rating

    if (sessionUser.role > Role.USER) {
        review.approved = req.body.approved ?? review.approved
        review.inappropriateReportUsers = req.body.inappropriateReportUsers ?? review.inappropriateReportUsers
    }
    review = await review.save()
    res.send(getOutputReview(review))
}))

// upsert review on recipe
reviewRouter.post('/', userRoute(async (req, res, sessionUser) => {
    const id = requireIdAsObjectId(req.body.reviewedRecipe)
    await requireRecipeFromId(id)
    let review = await Review.findOne({author: req.session.user!._id, reviewedRecipe: id})
    if (review) {
        requireReviewEdit(sessionUser, review)
        review.content = req.body.content ?? review.content
        review.rating = req.body.rating ?? review.rating
    } else {
        review = new Review({
            title: req.body.title,
            content: req.body.content,
            reviewedRecipe: req.body.reviewedRecipe,
            rating: req.body.rating,
            author: req.session.user!._id
        })
    }
    if (sessionUser.role > Role.USER) {
        review.approved = req.body.approved ?? review.approved
    }
    review = await review.save()
    res.send(getOutputReview(review))
}))

export async function getOutputReview(...reviews: IReview[]) {
    const reviewsOut = []
    for (const review of reviews) {
        const author = await User.findById(review.author)
        reviewsOut.push({
            authorName: author ? author.name : "",
            rating: review.rating,
            approved: review.approved,
            content: review.content,
            inappropriateReportUsers: review.inappropriateReportUsers,
            userVotes: review.userVotes,
            _id: review._id,
            author: review.author,
            reviewedRecipe: review.reviewedRecipe
        })
    }
    return reviewsOut
}

reviewRouter.get('/admin/all', adminRoute(async (req, res) => {
    res.send(await getOutputReview(...await Review.find()))
}))

reviewRouter.get('/', userRoute(async (req, res) => {
    res.send(await getOutputReview(...await Review.find({author: req.session.user!._id})))
}))

reviewRouter.get('/:id', publicRoute(async (req, res) => {
    const id = requireObjectIdFromPara(req)
    const review = await requireReviewFromId(id)
    res.send(await getOutputReview(review))
}))

reviewRouter.get('/recipe/:id', publicRoute(async (req, res) => {
    const id = requireObjectIdFromPara(req)
    res.send(await getOutputReview(...await Review.find({reviewedRecipe: id})))
}))

reviewRouter.get('/user/:id', publicRoute(async (req, res) => {
    const id = requireObjectIdFromPara(req)
    res.send(await getOutputReview(...await Review.find({author: id})))
}))

