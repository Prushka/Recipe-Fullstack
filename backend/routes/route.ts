/*
 * Copyright 2022 Dan Lyu
 */

import {IUser, Role} from "../models/user";
import {Request, Response} from "express";
import {EndpointError, throwError} from "../errors/errors";

function constructResponseErrorBody(e: EndpointError | string, message: string) {
    return {
        error: e,
        message: message
    }
}

export function genericErrorChecker(res: Response, e: any) {
    const errorHandler = (code: number, message: string) => {
        res.status(code).send(constructResponseErrorBody(e.name, message))
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
            default:
                console.log(e.message)
                res.status(500).send("Internal Server Error")
                break
        }
    } else {
        console.log(e.message)
        res.status(500).send("Internal Server Error")
    }
}

export function publicRoute(f: (req: Request, res: Response) => void) {
    return async (req: Request, res: Response) => {
        try {
            await f(req, res)
        } catch (e) {
            genericErrorChecker(res, e)
        }
    }
}


export function userRoute(f: (req: Request, res: Response, sessionUser: IUser) => void, minRole: Role = Role.USER) {
    return async (req: Request, res: Response) => {
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
}


export function adminRoute(f: (req: Request, res: Response, sessionUser: IUser) => void) {
    return userRoute(f, Role.ADMIN)
}