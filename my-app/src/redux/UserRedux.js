/*
 * Copyright 2022 Dan Lyu.
 */

import {createSlice} from "@reduxjs/toolkit";
import {API} from '../axios/Axios'
// this is just to keep a cache
// session is handled in backend
const counterSlice = createSlice({
    name: 'user',
    initialState: {
        id: undefined,
        name: "",
        email: "",
        avatar: "",
        role: undefined,
        followers: [],
        following: []
    },
    reducers: {
        login: async (state, action) => {
            API.post('/users/')
        }
    }
})

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})