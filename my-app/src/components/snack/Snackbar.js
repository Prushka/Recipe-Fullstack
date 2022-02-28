import * as React from 'react';
import './Snackbar.css';
import {IoClose} from "react-icons/io5";
import {useState} from "react";


class SnackbarProperties {
    constructor(text, timeout) {
        this.text = text
        this.timeout = timeout
    }
}

export function SnackBarManager() {
    const [snackBarIds, setSnackbarIds] = useState(0)
    const [snackbars, setSnackBars] = useState({
        1: new SnackbarProperties("test", 400),
        2: new SnackbarProperties("test2", 400)
    })
    const removeSnackBar = (id) => {
        const newSnackbars = {...snackbars}
        delete newSnackbars[id]
        setSnackBars(newSnackbars)
    }
    return (
        Object.keys(snackbars).map((key) => {
            return (
                <Snackbar key={key} text={snackbars[key]['text']} snackbarId={key}
                          removeSnackbar={removeSnackBar} snackBars={snackbars}/>
            )
        })
    )
}

export function Snackbar({
                             text,
                             position = "bottom-left",
                             type = "error",
                             timeout = 5000,
                             snackbarId,
                             removeSnackbar, snackBars
                         }) {
    let index = 0
    for (let key in snackBars) {
        console.log(key)
        if (key < snackbarId) {
            index = index + 1
        }
    }
    const verticalNumber = index * 62 + 24
    const verticalStyle = position.includes("bottom") ? {
        bottom: verticalNumber,
    } : {
        top: verticalNumber,
    }
    if (timeout > 0) {
        setTimeout(() => {
            removeSnackbar(snackbarId)
        }, timeout);
    }
    return (
        <div style={verticalStyle}
             className={`snackbar snackbar--shadow snackbar--${position} snackbar--${type}`}>
            <span>{text}</span>
            <IoClose
                onClick={() => removeSnackbar(snackbarId)} size={25} className={'button-icon snackbar--close'}/>
        </div>
    )
}
