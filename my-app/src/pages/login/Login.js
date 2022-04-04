/*
 * Copyright 2022 Dan Lyu.
 */
import './Auth.css';
import {TextField} from "../../components/input/TextField";
import * as React from "react";
import {BlueBGButton} from "../../components/input/Button";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {login} from '../../redux/Redux'
import {UserAPI} from "../../axios/Axios";
import {useState} from "react";
import {Alert, Snackbar} from "@mui/material";
import {useSnackbar} from "notistack";

export default function Login() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [usernameEmail, setUsernameEmail] = useState("")
    const [password, setPassword] = useState("")


    const login = async () => {
        await UserAPI.post('/login',
            {"email": usernameEmail, "password": password}).then(res => {
            console.log(res)
        }).catch(error => {
            enqueueSnackbar(`${error.response.data}`,
                {
                    variant: 'error'
                })
        })
    }
    return (
        <>
            <div className="auth__container">
                <div className="auth__title">
                    Log-in
                </div>
                <TextField value={usernameEmail} setValue={setUsernameEmail} type="username" className="auth__input"
                           label={'Username'}/>
                <TextField value={password} setValue={setPassword} type="password" className="auth__input"
                           label={'Password'}/>
                <BlueBGButton className="auth__button" onClick={async () => {
                    await login()
                }}>Login</BlueBGButton>
                <div onClick={() => {
                    navigate("/signup")
                }} className="auth__link">Don't have an account? Click here to sign up
                </div>
            </div>
        </>
    )
}