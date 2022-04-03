import {Document, Model, model, ObjectId, Schema} from "mongoose";

type SimpleRating = 1 | 0 | -1

interface IUserReviewVote {
    positivity: SimpleRating
    author: ObjectId
}

export interface IReview extends Document {
    userVotes: IUserReviewVote[]
    inappropriateReportUsers: ObjectId[]
    approved: boolean
    content: string
    reviewedRecipe: ObjectId
    author: ObjectId
    rating: SimpleRating // according to whoever that person is, we are doing thumbs up/down only
}

const UserReviewVoteSchema = new Schema<IUserReviewVote>({
    positivity: {
        type: Number, required: true, default: 0, min: -1, max: 1,
        get: (v: number) => Math.round(v),
        set: (v: number) => Math.round(v)
    },
    author: {type: String, required: true}
})

const ReviewSchema = new Schema<IReview>({
    content: {type: String, required: true, default: ""},
    reviewedRecipe: {type: String, required: true},
    rating: {
        type: Number, required: true, default: 0, min: -1, max: 1,
        get: (v: number) => Math.round(v),
        set: (v: number) => Math.round(v)
    },
    author: {type: String, required: true},
    approved: {type: Boolean, required: true, default: true},
    userVotes: [{type: UserReviewVoteSchema}],
    inappropriateReportUsers: [{type: String}]
});


export const Review = model<IReview>('Review', ReviewSchema)