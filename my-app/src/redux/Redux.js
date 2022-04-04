/*
 * Copyright 2022 Dan Lyu.
 */

import {configureStore, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {UserAPI} from '../axios/Axios'

// this is just to keep a cache
// session is handled in backend

export const userSlice = createSlice({
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
        setUser: (state, action) => {
            state = {...action.payload}
            state.id = action.payload._id
        }
    },
})

export const {setUser} = userSlice.actions

export default userSlice.reducer

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
})