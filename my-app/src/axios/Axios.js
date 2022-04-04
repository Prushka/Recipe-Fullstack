/*
 * Copyright 2022 Dan Lyu.
 */

import axios from "axios";

axios.defaults.withCredentials = true

const BASE_URL = "http://localhost:8000"

export const API = axios.create({
    baseURL: `${BASE_URL}`
});

export const UserAPI = axios.create({
    baseURL: `${BASE_URL}/user`
});

export const ReviewAPI = axios.create({
    baseURL: `${BASE_URL}/review`
});

export const RecipeAPI = axios.create({
    baseURL: `${BASE_URL}/recipe`
});

export const logout = async () => {
    await UserAPI.post("/logout", {}, {withCredentials: true})
}

export const getAllFollowingUsers = async (user) => {
    const users = []
    for (const uid of user.following) {
        const res = await UserAPI.get(`/${uid}`)
        users.push(res.data)
    }
    return users
}

export const getAllFollowerUsers = async (user) => {
    const users = []
    for (const uid of user.followers) {
        const res = await UserAPI.get(`/${uid}`)
        users.push(res.data)
    }
    return users
}
