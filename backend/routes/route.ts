/*
 * Copyright 2022 Dan Lyu
 */

import {IUser, Role, SessionUser} from "../models/user";
import {Request, Response} from "express";
import {EndpointError, throwError} from "../errors/errors";
import {getAllEnums} from "../utils/util";
import {RecipeCategories, RecipeDiets} from "../models/recipe";

function constructResponseErrorBody(e: EndpointError | string, message: string, extra = {}) {
    return {
        error: e,
        message: message,
        ...extra
    }
}

export function genericErrorChecker(res: Response, e: any) {
    const errorHandler = (code: number, message: string, extra={}) => {
        res.status(code).send(constructResponseErrorBody(e.name, message, extra))
    }
    if (e instanceof Error) {
        const name = e.name
        switch (name) {
            case "ValidationError":
                errorHandler(400, e.message)
                break
            case EndpointError.UserNotLoggedIn:
                errorHandler(401, "Unauthorized (User not logged in)")
                break
            case EndpointError.NoPermission:
                errorHandler(401, "Permission Denied")
                break
            case EndpointError.InvalidObjectId:
                errorHandler(400, "Invalid Object Id")
                break
            case EndpointError.UserNotFound:
                errorHandler(404, "Required user cannot be found")
                break
            case EndpointError.RecipeNotFound:
                errorHandler(404, "Required recipe cannot be found")
                break
            case EndpointError.ReviewNotFound:
                errorHandler(404, "Required review cannot be found")
                break
            case EndpointError.InvalidAuth:
                errorHandler(400, "Invalid Email/Password combination")
                break
            case EndpointError.UsernameExists:
                errorHandler(400, "Username exists (Please choose a different one)")
                break
            case EndpointError.EmailExists:
                errorHandler(400, "Email exists (Please choose a different one)")
                break
            case EndpointError.UsernameEmailExists:
                errorHandler(400, "Username or email exists (Please choose a different one)")
                break
            case EndpointError.FollowMyself:
                errorHandler(400, "You cannot follow yourself")
                break
            case EndpointError.FileNotFound:
                errorHandler(404, "File not found")
                break
            case EndpointError.NotImageFile:
                errorHandler(400, "File is not an image")
                break
            case EndpointError.InvalidCategory:
                errorHandler(400, `Category is invalid`, {"categories":getAllEnums(RecipeCategories)})
                break
            case EndpointError.InvalidDiet:
                errorHandler(400, `Diet is invalid`,{"diets":getAllEnums(RecipeDiets)})
                break
            default:
                console.log(e)
                res.status(500).send("Internal Server Error")
                break
        }
    } else {
        console.log(e)
        res.status(500).send("Internal Server Error")
    }
}

export function publicRoute(f: (req: Request, res: Response) => void) {
    const _route = async (req: Request, res: Response) => {
        try {
            await f(req, res)
        } catch (e) {
            genericErrorChecker(res, e)
        }
    }
    _route.permission = "public"
    return _route
}


export function userRoute(f: (req: Request, res: Response, sessionUser: SessionUser) => void, minRole: Role = Role.USER) {
    const _route =  async (req: Request, res: Response) => {
        try {
            const user = req.session.user
            if (!user) {
                throwError(EndpointError.UserNotLoggedIn)
            }
            if (user!.role < (minRole ?? Role.USER)) {
                throwError(EndpointError.NoPermission)
            }
            await f(req, res, user!)
        } catch (e) {
            genericErrorChecker(res, e)
        }
    }
    _route.permission = 'user'
    return _route
}


export function adminRoute(f: (req: Request, res: Response, sessionUser: SessionUser) => void) {
    const _route =  userRoute(f, Role.ADMIN)
    _route.permission = "admin"
    return _route
}