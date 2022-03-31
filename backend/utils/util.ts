/*
 * Copyright 2022 Dan Lyu
 */

import {Request, Response} from "express";
import {IUser, Role, User} from "../models/user";

import {Document, ObjectId as ObjectIdType} from "mongoose";
import {IRecipe} from "../models/recipe";
import {EndpointError, throwError} from "../errors/Errors";

const {ObjectId} = require('mongodb');


export function route(f: (req: Request, res: Response) => void) {
    return async (req: Request, res: Response) => {
        try{
            await f(req, res)
        }catch (e){
            genericErrorChecker(res, e)
        }
    }
}

export function genericErrorChecker(res: Response, e: any) {
    if (e instanceof Error) {
        console.log(e.name)
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
        }
    } else {
        console.log(e.message)
        res.status(500).send("Internal Server Error")
    }
}

export function getObjectIdFromPara(req: Request): ObjectIdType {
    const id = req.params.id
    if (!ObjectId.isValid(id)) {
        throwError(EndpointError.InvalidObjectId)
    }
    return ObjectId(id)
}

export function validateUser(req: Request, role: Role = Role.USER) {
    if (!req.session.user) {
        throwError(EndpointError.UserNotLoggedIn)
    }
    const haveRole = req.session.user!.role >= role
    if (!haveRole) {
        throwError(EndpointError.NoPermission)
    }
}

export async function createAdminIfNotExist() {
    const email = "admin@admin.com"
    const name = "admin"
    const password = "DoJOxLZm*E2D"
    const preUser = await User.findByEmailName(email, name)
    if (!preUser) {
        console.log("Creating default admin user")
        let user = new User({
            name: name,
            email: email,
            password: password,
            role: Role.ADMIN
        })
        await user.save()
    }
}

export function userHasEditingPermissionOnRecipe(user: IUser, recipe: IRecipe) {
    return recipe.author == user._id || user.role > 0
}

export function removeFromOutput<T extends Document>(stuff: T | T[], ...key: string[]): any {
    const remove = (ss: T) => {
        const s: any = {...ss.toObject()}
        key.forEach((k: string) => {
            delete s[k]
        })
        return s
    }
    if (Array.isArray(stuff)) {
        const result: any[] = []
        stuff.forEach(s => {
            result.push(remove(s))
        })
        return result
    }
    return remove(stuff)
}

export async function updateUser(req: Request, res: Response, user: IUser) {
    const name = req.body.name ?? user.name
    const email = req.body.email ?? user.email
    if (email !== user.email) {
        const preUser = await User.findByEmailName(email, undefined)
        if (preUser) {
            res.status(400).send("Email has been taken")
            return undefined
        }
    }

    if (name !== user.name) {
        const preUser = await User.findByEmailName(undefined, name)
        if (preUser) {
            res.status(400).send("Name has been taken")
            return undefined
        }
    }
    user.name = name
    user.email = email
    if (req.body.password) {
        user.password = req.body.password
    }
    return user
}