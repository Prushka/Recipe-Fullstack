import {Rating} from "@mui/material";
import React from "react";

export default function TextBox({content, label}) {
    return <div className={'input__box'}>
        <span className={'rating__title'}>{label}:</span>
        <pre className={'text__box'}>{content}</pre>
    </div>
}