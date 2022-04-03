/*
 * Copyright 2022 Dan Lyu
 */

import {IUser, Role} from "../models/user";
import {Request, Response} from "express";
import {EndpointError, throwError} from "../errors/errors";
import {genericErrorChecker} from "../utils/util";

export interface UserInjectionSpec {
    required: boolean
    minRole?: Role
}

const DefaultUserInjectionSpec: UserInjectionSpec = {
    required: true,
    minRole: Role.USER
}

export function publicRoute(f: (req: Request, res: Response) => void) {
    return route(f, {required: false})
}

export function route(f: (req: Request, res: Response, user: IUser | null) => void, userSpec: UserInjectionSpec = DefaultUserInjectionSpec) {
    return async (req: Request, res: Response) => {
        try {
            const user = req.session.user
            if (userSpec.required) {
                if (!user) {
                    throwError(EndpointError.UserNotLoggedIn)
                }
                if (user!.role < (userSpec.minRole ?? Role.USER)) {
                    throwError(EndpointError.NoPermission)
                }
                await f(req, res, user!)
            } else {
                await f(req, res, null)
            }
        } catch (e) {
            genericErrorChecker(res, e)
        }
    }
}