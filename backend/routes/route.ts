/*
 * Copyright 2022 Dan Lyu
 */

import {IUser, Role} from "../models/user";
import {Request, Response} from "express";
import {EndpointError, throwError} from "../errors/errors";
import {genericErrorChecker} from "../utils/util";

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