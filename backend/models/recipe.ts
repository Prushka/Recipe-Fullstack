import {Document, model, ObjectId, Schema} from "mongoose";

enum RecipeCategory {
    Japanese = "Japanese",
    Unknown = "Unknown"
}

interface IRecipe extends Document {
    title: string
    category: RecipeCategory
    content: string
    author?: ObjectId
}

interface IReview extends Document {
    name: string
}

const RecipeSchema = new Schema<IRecipe>({
    title: {type: String, required: true},
    category: {type: String, required: true, default: RecipeCategory.Unknown},
    content: {type: String, required: true, default: ""},
});

export const Recipe = model<IRecipe>('Recipe', RecipeSchema)