/*
 * Copyright 2022 Dan Lyu.
 */
import './Auth.css';
import {TextField} from "../../components/input/TextField";
import * as React from "react";
import {BlueBGButton} from "../../components/input/Button";

export default function Login() {
    return (
        <>
        <div className="auth__container">
            <div className="auth__title">
                Log-in
            </div>
            <TextField type="username" className="auth__input" label={'Username'}/>
            <TextField type="password" className="auth__input" label={'Password'}/>
                <BlueBGButton className="auth__button" onClick={() => {
                }}>Login</BlueBGButton>
            <div className="auth__link">Click here to create an account</div>
        </div>
        </>
    )
}