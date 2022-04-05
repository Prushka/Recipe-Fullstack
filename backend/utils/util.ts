/*
 * Copyright 2022 Dan Lyu
 */

import {Request, Response} from "express";
import {IUser, Role, User} from "../models/user";

import {Document, ObjectId as ObjectIdType} from "mongoose";
import {EndpointError, throwError} from "../errors/errors";
import {BASE_URL} from "../server";

const {ObjectId} = require('mongodb');

export function getFileURLFromFile(file: any) {
    return getImageURLFromFilename(file._id, file.contentType.split("/")[1])
}

export function getImageURLFromFilename(id: string | ObjectIdType, suffix = '') {
    const _suffix = suffix ? `.${suffix}` : ''
    return `${BASE_URL}/file/image/${id}${_suffix}`
}

export function getImageURLFromString(input: string) {
    if (!input) {
        return input
    }
    if (input.toLowerCase().includes("http")) {
        return input
    }
    return getImageURLFromFilename(input)
}

export function requireIdAsObjectId(id: string): ObjectIdType {
    if (!ObjectId.isValid(id)) {
        throwError(EndpointError.InvalidObjectId)
    }
    return ObjectId(id)
}

export function requireObjectIdFromPara(req: Request): ObjectIdType {
    const id = req.params.id
    return requireIdAsObjectId(id)
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
            throwError(EndpointError.EmailExists)
        }
    }

    if (name !== user.name) {
        const preUser = await User.findByEmailName(undefined, name)
        if (preUser) {
            throwError(EndpointError.UsernameExists)
        }
    }
    user.name = name
    user.email = email
    user.avatar = req.body.avatar ?? user.avatar
    if (req.body.password) {
        user.password = req.body.password
    }
    return user
}

export async function getUserFromSession(req: Request): Promise<IUser> {
    const _user = await User.findOne({
        email: req.session.user!.email,
        name: req.session.user!.name
    })
    return _user!
}