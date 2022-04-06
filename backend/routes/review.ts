/*
 * Copyright 2022 Dan Lyu
 */

import {requireObjectIdFromPara} from "../utils/util";
import {IReview, Review} from "../models/review";
import express from "express";
import {adminRoute, publicRoute, userRoute} from "./route";
import {Role, SessionUser, User} from "../models/user";
import {ObjectId as ObjectIdType} from "mongoose";
import {EndpointError, throwError} from "../errors/errors";
import {requireRecipeFromId} from "./recipe";
import {Recipe} from "../models/recipe";
import {Request} from "express";
import {
    PostReview,
    RecipeObjectId,
    ReviewObjectId, ReviewOutput,
    UpdateReview, UserObjectId,
    VoteReview
} from "../business-schemas";

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
    res.send(await getOneOutputReview(review))
}, {
    description: "Delete a review's report by review id (Effective only when logged-in-user is the author who reported this review)",
    possibleErrors: [EndpointError.ReviewNotFound],
    paramMapping: ReviewObjectId,
    returns: ReviewOutput
}))

reviewRouter.post('/report/:id', userRoute(async (req, res, sessionUser) => {
    const reviewId = requireObjectIdFromPara(req)
    let review = await requireReviewFromId(reviewId)
    review = (await Review.findByIdAndUpdate(
        review._id,
        {$addToSet: {inappropriateReportUsers: sessionUser._id}},
        {new: true}))!
    res.send(await getOneOutputReview(review))
}, {
    description: "Report a review as inappropriate by review id", possibleErrors: [EndpointError.ReviewNotFound],
    paramMapping: ReviewObjectId,
    returns: ReviewOutput
}))

// upsert vote on review
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
    res.send(await getOneOutputReview(review))
}, {
    description: "Upvote or downvote a review (upsert action)",
    possibleErrors: [EndpointError.ReviewNotFound],
    requestBody: VoteReview,
    paramMapping: ReviewObjectId,
    returns: ReviewOutput
}))

reviewRouter.delete('/:id', userRoute(async (req, res, sessionUser) => {
    const reviewId = requireObjectIdFromPara(req)
    let review = await requireReviewFromId(reviewId)
    requireReviewEdit(sessionUser, review)
    await review.delete()
    res.send(await getOneOutputReview(review))
}, {
    description: "Delete a review by review id", possibleErrors: [EndpointError.NoPermission],
    paramMapping: ReviewObjectId,
    returns: ReviewOutput
}))

function updateReview(review: IReview, req: Request, user: SessionUser) {
    review.content = req.body.content ?? review.content
    review.rating = req.body.rating ?? review.rating
    if (user.role > Role.USER) {
        review.approved = req.body.approved ?? review.approved
        review.inappropriateReportUsers = req.body.inappropriateReportUsers ?? review.inappropriateReportUsers
    }
    return review
}

// update review by review id
reviewRouter.patch('/:id', userRoute(async (req, res, sessionUser) => {
    const reviewId = requireObjectIdFromPara(req)
    let review = await requireReviewFromId(reviewId)
    requireReviewEdit(sessionUser, review)
    review = updateReview(review, req, sessionUser)
    review = await review.save()
    res.send(await getOneOutputReview(review))
}, {
    description: "Update a review by review id",
    possibleErrors: [EndpointError.ReviewNotFound],
    requestBody: UpdateReview,
    paramMapping: ReviewObjectId,
    returns: ReviewOutput
}))

// upsert review on recipe
reviewRouter.post('/:id', userRoute(async (req, res, sessionUser) => {
    const id = requireObjectIdFromPara(req)
    await requireRecipeFromId(id)
    let review: IReview | null = await Review.findOne({author: req.session.user!._id, reviewedRecipe: id})
    if (review) {
        requireReviewEdit(sessionUser, review)
    } else {
        review = new Review({
            reviewedRecipe: id,
            author: req.session.user!._id
        })
    }
    review = updateReview(review, req, sessionUser)
    review = await review.save()
    res.send(await getOneOutputReview(review))
}, {
    description: "Post or Update a review on recipe by recipe id (upsert action)",
    possibleErrors: [EndpointError.ReviewNotFound, EndpointError.RecipeNotFound],
    requestBody: PostReview,
    paramMapping: RecipeObjectId,
    returns: ReviewOutput
}))

export async function getOneOutputReview(review: IReview) {
    const reviews = await getOutputReview(review)
    if (reviews && reviews.length > 0) {
        return reviews[0]
    }
    return reviews
}

export async function getOutputReview(...reviews: IReview[]) {
    const reviewsOut = []
    for (const review of reviews) {
        const author = await User.findById(review.author)
        const recipe = await Recipe.findById(review.reviewedRecipe)
        const userVotes = []
        let upVotes = 0
        let downVotes = 0
        for (const vote of review.userVotes) {
            const voteAuthor = await User.findById(vote.author)
            upVotes += vote.positivity === 1 ? 1 : 0
            downVotes += vote.positivity === -1 ? 1 : 0
            userVotes.push({
                    authorName: voteAuthor ? voteAuthor.name : "",
                    positivity: vote.positivity,
                    author: vote.author
                }
            )
        }
        reviewsOut.push({
            authorName: author ? author.name : "",
            authorAvatar: author ? author.avatar : "",
            rating: review.rating,
            approved: review.approved,
            content: review.content,
            upVotes: upVotes,
            downVotes: downVotes,
            inappropriateReportUsers: review.inappropriateReportUsers,
            userVotes: userVotes,
            reviewedRecipeTitle: recipe ? recipe.title : "",
            _id: review._id,
            author: review.author,
            reviewedRecipe: review.reviewedRecipe,
        })
    }
    return reviewsOut
}

reviewRouter.get('/admin/all', adminRoute(async (req, res) => {
    res.send(await getOutputReview(...await Review.find()))
}, {description: "Get all reviews", returns: ReviewOutput, returnsArray: true}))

reviewRouter.get('/', userRoute(async (req, res) => {
    res.send(await getOutputReview(...await Review.find({author: req.session.user!._id})))
}, {description: "Get logged-in-user's reviews", returns: ReviewOutput, returnsArray: true}))

reviewRouter.get('/:id', publicRoute(async (req, res) => {
    const id = requireObjectIdFromPara(req)
    const review = await requireReviewFromId(id)
    res.send(await getOneOutputReview(review))
}, {
    description: "Get review by review id", possibleErrors: [EndpointError.ReviewNotFound],
    paramMapping: ReviewObjectId,
    returns: ReviewOutput
}))

reviewRouter.get('/recipe/:id', publicRoute(async (req, res) => {
    const id = requireObjectIdFromPara(req)
    res.send(await getOutputReview(...await Review.find({reviewedRecipe: id})))
}, {
    description: "Get all reviews on recipe by recipe id",
    paramMapping: RecipeObjectId,
    returns: ReviewOutput,
    returnsArray: true
}))

reviewRouter.get('/user/:id', publicRoute(async (req, res) => {
    const id = requireObjectIdFromPara(req)
    res.send(await getOutputReview(...await Review.find({author: id})))
}, {
    description: "Get all reviews a user has posted by user id",
    paramMapping: UserObjectId,
    returns: ReviewOutput,
    returnsArray: true
}))