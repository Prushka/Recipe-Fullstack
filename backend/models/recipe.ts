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
    tags: string[]
    approved: boolean
}


const RecipeSchema = new Schema<IRecipe>({
    title: {type: String, required: true},
    category: {type: String, required: true, default: RecipeCategory.Unknown},
    content: {type: String, required: true, default: ""},
    author: {type: String},
    tags: [{
        type: String
    }],
    approved: {type: "boolean", required: true, default: false}
});

RecipeSchema.pre('save', function (next) {
    const recipe = this;
    if (recipe.isModified('tags')) {
        recipe.tags = [...new Set(recipe.tags)]
        next()
    } else {
        next()
    }
})

export const Recipe = model<IRecipe>('Recipe', RecipeSchema)