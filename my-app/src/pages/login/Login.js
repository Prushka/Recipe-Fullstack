/*
 * Copyright 2022 Dan Lyu.
 */
import './Auth.css';
import {TextField} from "../../components/input/TextField";
import * as React from "react";
import {BlueBGButton} from "../../components/input/Button";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {login, setUser} from '../../redux/Redux'
import {UserAPI} from "../../axios/Axios";
import {useEffect, useState} from "react";
import {Alert, Snackbar} from "@mui/material";
import {useSnackbar} from "notistack";

export default function Login() {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [usernameEmail, setUsernameEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async (usernameEmail, password) => {
        await UserAPI.post('/login',
            {"input": usernameEmail, "password": password},
            {withCredentials: true}).then(res => {
            enqueueSnackbar(`Success`,
                {
                    variant: 'success',
                    persist: false,
                })
            dispatch(setUser(res.data))
            navigate("/dashboard")
        }).catch(error => {
            enqueueSnackbar(`${error.response.data.message}`,
                {
                    variant: 'error',
                    persist: false,
                })
        })
    }

    return (
        <>
            <div className="auth__container">
                <div className="auth__title">
                    Log-in
                </div>
                <form onSubmit={async (e) => {
                    e.preventDefault()
                }}>
                    <TextField value={usernameEmail} setValue={setUsernameEmail} type="username" className="auth__input"
                               label={'Username / Email'}/>
                    <TextField value={password} setValue={setPassword} type="password" className="auth__input"
                               label={'Password'}/>
                    <BlueBGButton type="submit" className="auth__button" onClick={async () => {
                        await login(usernameEmail, password)
                    }}>Login</BlueBGButton>

                </form>
                <div onClick={() => {
                    navigate("/signup")
                }} className="auth__link">Don't have an account? Click here to sign up
                </div>
            </div>
        </>
    )
}