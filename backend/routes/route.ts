/*
 * Copyright 2022 Dan Lyu
 */

import {IUser, Role} from "../models/user";
import {Request, Response} from "express";
import {EndpointError, throwError} from "../errors/errors";

export function genericErrorChecker(res: Response, e: any) {
    if (e instanceof Error) {
        switch (e.name) {
            case "ValidationError":
                res.status(400).send(e.message)
                break
            case EndpointError.UserNotLoggedIn:
                res.status(401).send("Unauthorized")
                break
            case EndpointError.NoPermission:
                res.status(401).send("Permission Denied")
                break
            case EndpointError.InvalidObjectId:
                res.status(404).send("Invalid ID")
                break
            case EndpointError.UserNotFound:
                res.status(404).send("User cannot be found")
                break
            case EndpointError.RecipeNotFound:
                res.status(404).send("Recipe cannot be found")
                break
            case EndpointError.ReviewNotFound:
                res.status(404).send("Review cannot be found")
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