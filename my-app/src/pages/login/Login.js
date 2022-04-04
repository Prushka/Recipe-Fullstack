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

export default function Login() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    return (
        <>
            <div className="auth__container">
                <div className="auth__title">
                    Log-in
                </div>
                <TextField type="username" className="auth__input" label={'Username'}/>
                <TextField type="password" className="auth__input" label={'Password'}/>
                <BlueBGButton className="auth__button" onClick={() => {
                    dispatch(login({
                        email: "admin@admin.com",
                        password: "DoJOxLZm*E2D"
                    }))
                }}>Login</BlueBGButton>
                <div onClick={() => {
                    navigate("/signup")
                }} className="auth__link">Don't have an account? Click here to sign up
                </div>
            </div>
        </>
    )
}