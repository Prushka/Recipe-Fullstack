/*
 * Copyright 2022 Dan Lyu.
 */
import {TextField} from "./TextField";
import * as React from "react";

export default function PasswordTextField({className, password, setPassword, passwordInputType, setPasswordInputType}) {
    return (
        <TextField value={password} setValue={setPassword} type={passwordInputType} className={className}
                   label={'Password'}>
            <div onClick={() => {
                setPasswordInputType(passwordInputType === "password" ? "text" : "password")
            }}
                 className={'auth__toggle-password'}>{passwordInputType === "password" ? "Show Password" : "Hide Password"}</div>
        </TextField>
    )
}
