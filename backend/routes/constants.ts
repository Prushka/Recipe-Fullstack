/*
 * Copyright 2022 Dan Lyu
 */


import {getAllEnums, getUserFromSession, requireObjectIdFromPara, updateUser,} from "../utils/util";
import {IUser, Role, User} from "../models/user";
import express, {Request} from "express";
import {adminRoute, publicRoute, userRoute} from "./route";
import {ObjectId} from "mongoose";
import {EndpointError, throwError} from "../errors/errors";
import {RecipeCategories, RecipeDiets} from "../models/recipe";
import {getAllRoutes} from "../spec/generation";

export const constantRoute = express.Router()

constantRoute.get("/recipe/categories", publicRoute(async(req, res)=>{
    res.send(getAllEnums(RecipeCategories))
}))

constantRoute.get("/recipe/diets", publicRoute(async(req, res)=>{
    res.send(getAllEnums(RecipeDiets))
}))

constantRoute.get("/routes", publicRoute(async (req, res)=>{
    res.send(getAllRoutes())
}))