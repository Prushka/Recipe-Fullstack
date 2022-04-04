/*
 * Copyright 2022 Dan Lyu.
 */

import axios from "axios";

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

export const logout = async() => {
    await UserAPI.post("/logout", {},{withCredentials: true})
}