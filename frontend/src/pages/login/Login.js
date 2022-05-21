/*
 * Copyright 2022 Dan Lyu.
 */
import './Auth.css';
import {TextField} from "../../components/input/TextField";
import * as React from "react";
import {BlueBGButton} from "../../components/input/Button";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {setUser} from '../../redux/Redux'
import {UserAPI} from "../../axios/Axios";
import {useState} from "react";
import {useSnackbar} from "notistack";
import PasswordTextField from "../../components/input/PasswordTextField";
import {snackBarHandleError} from "../../util";

export default function Login() {
    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()
    useSelector((state) => state.user);
    const dispatch = useDispatch()
    const [usernameEmail, setUsernameEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordInputType, setPasswordInputType] = useState("password")

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
        }).catch(e => {
            snackBarHandleError(enqueueSnackbar, e)
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
                    <PasswordTextField password={password} setPassword={setPassword} passwordInputType={passwordInputType}
                                       className="auth__input" setPasswordInputType={setPasswordInputType}/>
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