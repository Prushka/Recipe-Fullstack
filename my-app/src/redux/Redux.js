/*
 * Copyright 2022 Dan Lyu.
 */

import {configureStore, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {UserAPI} from '../axios/Axios'

// this is just to keep a cache
// session is handled in backend

export const login = createAsyncThunk(
    'user/login',
    async (payload, thunkAPI) => {
        const response = await UserAPI.post('/login',
            {"email": payload.email, "password": payload.password})
        return response.data
    }
)

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
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(login.fulfilled, (state, action) => {
            // Add user to the state array
            console.log(action.payload)
        })
    }
})

export default userSlice.reducer

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
})