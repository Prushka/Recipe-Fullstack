import {Document, Model, model, ObjectId, Schema} from "mongoose";

interface IReview extends Document {
    title: string
    content: string
    reviewedRecipe: ObjectId
    author: ObjectId
    rating: 1 | 0 | -1 // according to whoever that person is, we are doing thumbs up/down only
}

const ReviewSchema = new Schema<IReview>({
    title: {type: String, required: true},
    content: {type: String, required: true, default: ""},
    reviewedRecipe: {type: String, required: true},
    rating: {type: Number, required: true, default: 0},
    author: {type: String, required: true}
});


export const Review = model<IReview>('Review', ReviewSchema)