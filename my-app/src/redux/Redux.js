/*
 * Copyright 2022 Dan Lyu.
 */

import {configureStore, createSlice} from "@reduxjs/toolkit";

// this is just to keep a cache
// session is handled in backend

export const userInitialState = {
    _id: undefined,
    name: "",
    email: "",
    avatar: "",
    role: undefined,
    followers: [],
    following: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {...userInitialState},
    reducers: {
        setUser: (state, action) => {
            state = {...action.payload}
            state._id = action.payload._id
            return state
        },
        resetUser: (state) => {
            return {...userInitialState}
        }
    },
})

export const {setUser, resetUser} = userSlice.actions

export default userSlice.reducer

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
})