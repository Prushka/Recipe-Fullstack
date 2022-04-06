/*
 * Copyright 2022 Dan Lyu.
 */

import axios from "axios";
import {setUser} from "../redux/Redux";

axios.defaults.withCredentials = true

// the following doesn't accept env var in production build
// AND I didn't find a way to pass it to docker build
// const BASE_URL = "https://express.csc309.muddy.ca"
// const BASE_URL = process.env.NODE_ENV === 'production' ? "https://express.csc309.muddy.ca" : "http://localhost:8000"
const BASE_URL = "https://express.csc309.muddy.ca"

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

export const FileAPI = axios.create({
    baseURL: `${BASE_URL}/file`
});

export const FileUploadAPI = axios.create({
    baseURL: `${BASE_URL}/file`,
    headers: {"Content-Type": "multipart/form-data"}
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

export async function updateUserInfo(dispatch) {
    const response = await UserAPI.get('')
    dispatch(setUser(response.data))
}

export async function fetchUserSession(user, navigate, dispatch, onSuccess = () => {
}) {
    if (!user._id) {
        try {
            const response = await UserAPI.get('', {withCredentials: true})
            dispatch(setUser(response.data))
            onSuccess()
        } catch (e) {
            navigate && navigate('/login')
        }
    }
}