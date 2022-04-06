import {Document, Model, model, ObjectId, Schema} from "mongoose";
import {getAllEnums, getFileURLFromStoredString} from "../utils/util";
import {EndpointError, throwError} from "../errors/errors";

export const DEFAULT_RECIPE_THUMBNAIL = "https://s2.loli.net/2022/04/06/TOJBZgKVxko4lA6.png"

export enum RecipeCategories {
    Unknown = 'Unknown',
    Japanese = 'Japanese',
    Chinese = 'Chinese',
    French = 'French',
    Italian = 'Italian',
    Vietnamese = 'Vietnamese',
    Mexican = 'Mexican',
    Indian = 'Indian',
    Pastry = 'Pastry',
    Drinks = 'Drinks',
    Korean = 'Korean',
}

export enum RecipeDiets {
    Omnivore = 'Omnivore',
    Pescatarian = 'Pescatarian',
    Vegetarian = 'Vegetarian',
    Unknown = 'Unknown'
}

export function requireValidRecipeDiet(input: string) {
    if (input && !getAllEnums(RecipeDiets).includes(input)) {
        throwError(EndpointError.InvalidDiet)
    }
}

export function requireValidRecipeCategory(input: string) {
    if (input && !getAllEnums(RecipeCategories).includes(input)) {
        throwError(EndpointError.InvalidCategory)
    }
}

export interface IRecipe extends Document {
    title: string
    category: string
    diet: string
    instructions: string
    ingredients: string[]
    author?: ObjectId
    tags: string[]
    approved: boolean
    thumbnail?: string
}

interface RecipeModel extends Model<IRecipe> {
    findRecipeByUser: (id: string | ObjectId) => Promise<IRecipe[]>
}

const RecipeSchema = new Schema<IRecipe, RecipeModel>({
    title: {type: String, required: true},
    category: {type: String, required: true, default: RecipeCategories.Unknown},
    diet: {type: String, required: true, default: RecipeCategories.Unknown},
    instructions: {type: String, required: true, default: ""},
    ingredients: [{
        type: String,
        required: true,
        default: ""
    }],
    author: {type: String},
    tags: [{
        type: String,
        required: true
    }],
    approved: {type: "boolean", required: true, default: false},
    thumbnail: {
        type: String, required: false, get:
            (thumbnail: string) => getFileURLFromStoredString(thumbnail) ?? DEFAULT_RECIPE_THUMBNAIL
    }
});

RecipeSchema.static('findRecipeByUser', async function findRecipeByUser(id: string) {
    const Recipe = this
    return Recipe.find({author: id})
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

export const Recipe = model<IRecipe, RecipeModel>('Recipe', RecipeSchema)