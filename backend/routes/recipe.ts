import {getUserFromSession, requireObjectIdFromPara} from "../utils/util";
import {Role, SessionUser, User} from "../models/user";
import {IRecipe, Recipe, requireValidRecipeCategory, requireValidRecipeDiet} from "../models/recipe";
import express from "express";
import {publicRoute, userRoute} from "./route";
import {EndpointError, throwError} from "../errors/errors";
import {ObjectId as ObjectIdType} from "mongoose";
import {getOutputUser} from "./user";
import {
    RecipeObjectId,
    PostRecipe,
    UserObjectId,
    UpdateRecipe, RecipeOutput, UserOutput
} from "../business-schemas";
import {IReview, Review} from "../models/review";
import {getOutputReview} from "./review";

export async function requireRecipeFromId(id: ObjectIdType): Promise<IRecipe> {
    const recipe = await Recipe.findById(id)
    if (!recipe) {
        throwError(EndpointError.RecipeNotFound)
    }
    return recipe!
}

function requireRecipeEdit(user: SessionUser, recipe: IRecipe) {
    if (recipe.author !== user._id && user.role < Role.ADMIN) {
        throwError(EndpointError.NoPermission)
    }
}

export const recipeRouter = express.Router();
recipeRouter.delete('/:id', userRoute(async (req, res, sessionUser) => {
    const id = requireObjectIdFromPara(req)
    let recipe = await requireRecipeFromId(id)
    requireRecipeEdit(sessionUser, recipe)
    await recipe.delete()
    res.send(await getOutputRecipe(recipe))
}, {
    description: "Delete recipe by recipe id",
    possibleErrors: [EndpointError.RecipeNotFound, EndpointError.NoPermission],
    paramMapping: RecipeObjectId,
    returns: RecipeOutput
}))

recipeRouter.patch('/:id', userRoute(async (req, res, sessionUser) => {
    const id = requireObjectIdFromPara(req)
    let recipe = await requireRecipeFromId(id)
    requireRecipeEdit(sessionUser, recipe)
    requireValidRecipeCategory(req.body.category)
    requireValidRecipeDiet(req.body.diet)
    recipe.title = req.body.title ?? recipe.title
    recipe.instructions = req.body.instructions ?? recipe.instructions
    recipe.ingredients = req.body.ingredients ?? recipe.ingredients
    recipe.category = req.body.category ?? recipe.category
    recipe.diet = req.body.diet ?? recipe.diet
    recipe.tags = req.body.tags ?? recipe.tags
    recipe.thumbnail = req.body.thumbnail ?? recipe.thumbnail
    if (sessionUser!.role > Role.USER) {
        recipe.approved = req.body.approved ?? recipe.approved
    }
    recipe = await recipe.save()
    res.send((await getOutputRecipe(recipe))[0])
}, {
    description: "Update recipe by recipe id",
    possibleErrors: [EndpointError.RecipeNotFound, EndpointError.NoPermission],
    paramMapping: RecipeObjectId,
    requestBody: UpdateRecipe,
    returns: RecipeOutput
}))

recipeRouter.post('/save/:id', userRoute(async (req, res, sessionUser) => {
    const id = requireObjectIdFromPara(req)
    let recipe = await requireRecipeFromId(id)
    const user = await User.findByIdAndUpdate(
        sessionUser._id,
        {$addToSet: {savedRecipes: recipe._id}},
        {new: true})
    res.send(getOutputUser(user!))
}, {
    description: "Save a recipe (by recipe id) as favorite",
    possibleErrors: [EndpointError.RecipeNotFound],
    paramMapping: RecipeObjectId, returns: UserOutput
}))

recipeRouter.delete('/save/:id', userRoute(async (req, res, sessionUser) => {
    const id = requireObjectIdFromPara(req)
    let recipe = await requireRecipeFromId(id)
    const user = await User.findByIdAndUpdate(
        sessionUser._id,
        {$pull: {savedRecipes: recipe._id}},
        {new: true})
    res.send(getOutputUser(user!))
}, {
    description: "Remove a favorite recipe from saved recipes by recipe id",
    possibleErrors: [EndpointError.RecipeNotFound],
    paramMapping: RecipeObjectId, returns: UserOutput
}))

recipeRouter.post('/', userRoute(async (req, res, sessionUser) => {
    requireValidRecipeCategory(req.body.category)
    requireValidRecipeDiet(req.body.diet)
    let recipe = new Recipe({
        title: req.body.title,
        category: req.body.category,
        diet: req.body.diet,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        author: sessionUser._id,
        tags: req.body.tags,
        thumbnail: req.body.thumbnail
    })
    if (sessionUser!.role > Role.USER) {
        recipe.approved = req.body.approved ?? recipe.approved
    }
    recipe = await recipe.save()
    res.send((await getOutputRecipe(recipe))[0])
}, {
    description: "Create a recipe", possibleErrors: [EndpointError.InvalidCategory, EndpointError.InvalidDiet],
    requestBody: PostRecipe, returns: RecipeOutput
}))

export async function getOutputRecipe(...recipes: IRecipe[]) {
    const recipesOut = []
    for (const recipe of recipes) {
        const author = await User.findById(recipe.author)
        let _reviews: IReview[] = await Review.find({reviewedRecipe: recipe._id})
        const reviews = _reviews ? await getOutputReview(..._reviews) : []
        let totalRating = 0
        reviews.forEach(review => {
            totalRating += review.rating
        })
        recipesOut.push({
            title: recipe.title,
            thumbnail: recipe.thumbnail,
            authorName: author ? author.name : "",
            category: recipe.category,
            diet: recipe.diet,
            instructions: recipe.instructions,
            ingredients: recipe.ingredients,
            tags: recipe.tags,
            approved: recipe.approved,
            _id: recipe._id,
            author: recipe.author,
            reviews: reviews,
            averageRating: totalRating / reviews.length
        })
    }
    return recipesOut
}

recipeRouter.get('/me', userRoute(async (req, res) => {
    res.send(await getOutputRecipe(...await Recipe.findRecipeByUser(req.session.user!._id!)))
}, {description: "Get all recipes created by the logged-in-user", returns: RecipeOutput, returnsArray: true}))


recipeRouter.get('/public', publicRoute(async (req, res) => {
    res.send(await getOutputRecipe(...(await Recipe.find({approved: true}))))
}, {description: "Get all recipes with approved === true", returns: RecipeOutput, returnsArray: true}))

recipeRouter.get('/saved', userRoute(async (req, res, sessionUser) => {
    const recipes: IRecipe[] = []
    const user = await getUserFromSession(req)
    for (let savedRecipe of user.savedRecipes) {
        const recipe = await Recipe.findById(savedRecipe)
        recipe && recipes.push(recipe)
    }
    res.send(await getOutputRecipe(...recipes))
}, {description: "Get logged-in-user's saved (favorite) recipes", returns: RecipeOutput, returnsArray: true}))

recipeRouter.get('/:id', publicRoute(async (req, res) => {
        const id = requireObjectIdFromPara(req)
        const recipe = await requireRecipeFromId(id)
        res.send((await getOutputRecipe(recipe))[0])
    }, {description: "Get recipe data by recipe id", paramMapping: RecipeObjectId, returns: RecipeOutput})
)

recipeRouter.get('/author/:id', publicRoute(async (req, res) => {
        const id = requireObjectIdFromPara(req)
        res.send(await getOutputRecipe(...(await Recipe.findRecipeByUser(id))))
    }, {
        description: "Get all recipes created by user",
        paramMapping: UserObjectId,
        returns: RecipeOutput,
        returnsArray: true
    })
)

recipeRouter.get('/', publicRoute(async (req, res) => {
    res.send(await getOutputRecipe(...(await Recipe.find())))
}, {description: "Get all recipes regardless of approved or not", returns: RecipeOutput, returnsArray: true}))
