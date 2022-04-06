import {Document, model, ObjectId, Schema} from "mongoose";

type SimpleRating = 1 | 0 | -1

export interface IUserReviewVote {
    positivity: SimpleRating
    author?: ObjectId
}

export interface IReview extends Document {
    userVotes: IUserReviewVote[]
    inappropriateReportUsers: ObjectId[]
    approved: boolean
    content: string
    reviewedRecipe: ObjectId
    author: ObjectId
    rating: 1 | 2 | 3 | 4 | 5
}

const ReviewSchema = new Schema<IReview>({
    content: {type: String, required: false, default: ""},
    reviewedRecipe: {type: String, required: true},
    rating: {
        type: Number, required: true, default: 1, min: 1, max: 5,
        get: (v: number) => Math.round(v),
        set: (v: number) => Math.round(v)
    },
    author: {type: String, required: true},
    approved: {type: Boolean, required: true, default: true},
    userVotes: [{
        positivity: {
            type: Number, required: true, default: 0, min: -1, max: 1,
            get: (v: number) => Math.round(v),
            set: (v: number) => Math.round(v)
        },
        author: {type: String, required: true},
        _id: false
    }],
    inappropriateReportUsers: [{type: String}]
});


export const Review = model<IReview>('Review', ReviewSchema)