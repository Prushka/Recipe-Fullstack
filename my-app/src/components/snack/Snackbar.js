import * as React from 'react';
import './Snackbar.css';
import {IoClose} from "react-icons/io5";
import {useState} from "react";

let GlobalSnackbars = []
const addSnackbar = (snackbar) => {
    GlobalSnackbars.push(snackbar)
}
const removeSnackbar = (id) => {
    GlobalSnackbars = GlobalSnackbars.filter((sb) => {
        return sb.id !== id
    })
}

class SnackbarProperties {
    constructor({text, timeout, type, position}) {
        this.text = text
        this.timeout = timeout
        this.type = type ? type : "default"
        this.position = position ? position : "bottom-left"
        this.id = GlobalSnackbars.length === 0 ? 0 : GlobalSnackbars[GlobalSnackbars.length - 1].id + 1
        console.log(this.id)
        this.timeoutStarted = false
    }

    startTimer(removeSnackbar) {
        if (!this.timeoutStarted) {
            this.timeoutStarted = true
            setTimeout(() => {
                removeSnackbar(this.id)
            }, this.timeout);
        }
    }
}

export {SnackbarProperties, addSnackbar, removeSnackbar}


export function SnackBarManager() {
    const [snackbars, setSnackbars] = useState(0);
    setInterval(()=>{
        setSnackbars(snackbars+1)
        console.log(GlobalSnackbars)
    },1000)
    return (
        GlobalSnackbars.map((snackbar) => {
            return (
                <Snackbar snackbarsRandom={snackbars} key={snackbar.id} snackbar={snackbar} id={snackbar.id}
                          removeSnackbar={removeSnackbar} snackbars={GlobalSnackbars}/>
            )
        })
    );
}

export function Snackbar({
                             snackbar,
                             id,
                             removeSnackbar, snackbars
                         }) {
    let index = 0
    snackbars.forEach((sb) => {
        if (sb.id < id && sb.position === snackbar.position) {
            index = index + 1
        }
    })
    const verticalNumber = index * 62 + 24
    const verticalStyle = snackbar.position.includes("bottom") ? {
        bottom: verticalNumber,
    } : {
        top: verticalNumber,
    }
    if (snackbar.timeout > 0) {
        snackbar.startTimer(removeSnackbar)
    }
    return (
        <div style={verticalStyle}
             className={`snackbar snackbar--shadow snackbar--${snackbar.position} snackbar--${snackbar.type}`}>
            <span>{snackbar.text}</span>
            <IoClose
                onClick={() => removeSnackbar(id)} size={25} className={'button-icon snackbar--close'}/>
        </div>
    )
}
