/*
 * Copyright 2022 Dan Lyu.
 */
import './Auth.css';
import {TextField} from "../../components/input/TextField";
import {BlueBGButton} from "../../components/input/Button";
import * as React from "react";
import {useNavigate} from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate()
    return (
        <>
            <div className="auth__container">
                <div className="auth__title">
                    Signup
                </div>
                <TextField type="username" className="auth__input" label={'Username'}/>
                <TextField type="password" className="auth__input" label={'Password'}/>
                <BlueBGButton className="auth__button" onClick={() => {
                }}>Login</BlueBGButton>
                <div onClick={() => {
                    navigate("/login")
                }} className="auth__link">Already have an account? Click here to login</div>
            </div>
        </>
    )
}