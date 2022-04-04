/*
 * Copyright 2022 Dan Lyu
 */

import {getUserFromSession, removeFromOutput, requireObjectIdFromPara, updateUser,} from "../utils/util";
import {IUser, User} from "../models/user";
import express, {Request} from "express";
import {adminRoute, publicRoute, userRoute} from "./route";
import {ObjectId} from "mongoose";
import {EndpointError, throwError} from "../errors/errors";

export const userRouter = express.Router()

async function requiredUserById(id: ObjectId): Promise<IUser> {
    let user: IUser = (await User.findById(id))!
    if (!user) {
        throwError(EndpointError.UserNotFound)
    }
    return user
}

function updateSessionUser(req: Request, user: IUser) {
    req.session.user = {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        followers: user.followers,
        following: user.following,
        _id: user._id
    }
    return req.session.user
}

userRouter.post('/follow/:id', userRoute(async (req, res, sessionUser) => {
    const id = requireObjectIdFromPara(req)
    if (id == sessionUser._id) {
        res.send("You cannot follow yourself")
        return
    }
    const targetUser = await requiredUserById(id)
    const user = await User.findByIdAndUpdate(
        sessionUser._id,
        {$addToSet: {following: targetUser._id}},
        {new: true})
    await User.findByIdAndUpdate(
        targetUser._id,
        {$addToSet: {followers: sessionUser._id}},
        {new: true})
    res.send(updateSessionUser(req, user!))
}))

userRouter.delete('/follow/:id', userRoute(async (req, res, sessionUser) => {
    const id = requireObjectIdFromPara(req)
    const targetUser = await requiredUserById(id)
    const user = await User.findByIdAndUpdate(
        sessionUser._id,
        {$pull: {following: targetUser._id}},
        {new: true})
    await User.findByIdAndUpdate(
        targetUser._id,
        {$pull: {followers: sessionUser._id}},
        {new: true})
    res.send(updateSessionUser(req, user!))
}))

userRouter.delete('/',
    userRoute(async (req, res) => {
        const user = await getUserFromSession(req)
        await user!.delete()
        req.session.user = undefined
        res.send("Deleted")
    }))

userRouter.delete('/:id',
    adminRoute(async (req, res) => {
        const id = requireObjectIdFromPara(req)
        let user = await requiredUserById(id)
        await user.delete()
        res.send()
    }))

userRouter.get('/:id',
    publicRoute(async (req, res) => {
        const id = requireObjectIdFromPara(req)
        const user = await requiredUserById(id)
        res.send({
            name: user.name,
            avatar: user.avatar,
            role: user.role,
            followers: user.followers,
            following: user.following
        })
    }))

userRouter.get('/',
    userRoute(async (req, res) => {
        const user = await getUserFromSession(req)
        res.send(updateSessionUser(req,user))
    }))

userRouter.get('/all', adminRoute(async (req, res) => {
    res.send(removeFromOutput(await User.find(), "password"))
}))

userRouter.patch('/:id', adminRoute(async (req, res) => {
    const id = requireObjectIdFromPara(req)
    let user: IUser | null = await User.findById(id)
    if (!user) {
        res.send("User cannot be found")
        return
    }

    const updatedUser = await updateUser(req, res, user)
    if (!updatedUser) {
        return
    }
    updatedUser.role = req.body.role ?? updatedUser.role
    user = await updatedUser.save()
    user = removeFromOutput(user, "password")
    res.send(user)
}))

userRouter.patch('/', userRoute(async (req, res) => {
    let user = await getUserFromSession(req)
    const updatedUser = await updateUser(req, res, user)
    if (!updatedUser) {
        return
    }
    user = await updatedUser.save()
    res.send(updateSessionUser(req, user))
}));

userRouter.post("/logout", userRoute(async (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
}));

userRouter.post('/login', publicRoute(async (req, res) => {
    const input = req.body.input
    const password = req.body.password

    let user = await User.findByUsernameEmailPassword(input, password)
    if (!user) {
        throwError(EndpointError.InvalidAuth)
    }
    res.send(updateSessionUser(req, user))
}));

userRouter.post('/register', publicRoute(async (req, res) => {
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password
    const preUser = await User.findByEmailName(email, name)
    if (preUser) {
        res.status(400).send("User exists (same email or same name)")
        return
    }
    let user = new User({
        name: name,
        email: email,
        avatar: req.body.avatar,
        password: password
    })
    user = await user.save()
    res.send(updateSessionUser(req, user))
}));