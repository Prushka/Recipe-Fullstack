import {Request, Response} from "express";
import {IUser, Role, User} from "../models/user";

import {Document, ObjectId as ObjectIdType} from "mongoose";
import {IRecipe} from "../models/recipe";

const {ObjectId} = require('mongodb');

export function isValidationError(error: Error) {
    return error.name === "ValidationError"
}

export function serverError(res: Response) {
    res.status(500).send("Internal Server Error")
}

export function genericValidationInternal(res: Response, e: any) {
    if (e instanceof Error && isValidationError(e)) {
        res.status(400).send(e.message)
    } else {
        serverError(res)
    }
}

export function getObjectIdFromPara(req: Request, res: Response): ObjectIdType | null {
    const id = req.params.id
    if (!ObjectId.isValid(id)) {
        res.status(404).send("Invalid ID")
        return null
    }
    return ObjectId(id)
}

export function validateUser(req: Request, res: Response, role: Role = Role.USER) {
    if (!req.session.user) {
        res.status(401).send("Unauthorized")
        return false
    }
    const haveRole = req.session.user.role >= role
    if (!haveRole) {
        res.status(401).send("Unauthorized (Permission Denied)")
    }
    return haveRole
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