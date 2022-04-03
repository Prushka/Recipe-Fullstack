import {Document, Model, model, ObjectId, Schema} from "mongoose";

interface IUserReviewVote extends Document {
    positivity: boolean
    author: ObjectId
}

export interface IReview extends Document {
    userVotes: IUserReviewVote[]
    inappropriateReportUsers: ObjectId[]
    approved: boolean
    title: string
    content: string
    reviewedRecipe: ObjectId
    author: ObjectId
    rating: 1 | 0 | -1 // according to whoever that person is, we are doing thumbs up/down only
}

const UserReviewVoteSchema = new Schema<IUserReviewVote>({
    positivity: {type: "boolean", required: true},
    author: {type: String, required: true}
})

const ReviewSchema = new Schema<IReview>({
    title: {type: String, required: true},
    content: {type: String, required: true, default: ""},
    reviewedRecipe: {type: String, required: true},
    rating: {
        type: Number, required: true, default: 0, min: -1, max: 1,
        get: (v: number) => Math.round(v),
        set: (v: number) => Math.round(v),
    },
    author: {type: String, required: true},
    approved: {type: Boolean, required: true, default: true},
    userVotes: [{type: UserReviewVoteSchema}],
    inappropriateReportUsers: [{type: String}]
});


export const Review = model<IReview>('Review', ReviewSchema)