import * as React from 'react';
import './Snackbar.css';
import {IoClose} from "react-icons/io5";
import {useCallback, useContext, useState} from "react";
import {GlobalSnackBars, SnackbarContext} from "../../App";


class SnackbarProperties {
    constructor({text, timeout, type, position, id}) {
        this.text = text
        this.timeout = timeout
        this.type = type ? type : "default"
        this.position = position ? position : "bottom-left"
        this.id = id
        this.timeoutStarted = false
    }

    startTimer(removeSnackbar) {
        if(!this.timeoutStarted){
            this.timeoutStarted = true
            setTimeout(() => {
                removeSnackbar(this.id)
            }, this.timeout);
        }
    }
}



export {SnackbarProperties}

export function SnackBarManager() {
    const snackbarsContext = useContext(SnackbarContext)
    const removeSnackbar = snackbarsContext.removeSnackbar
    return (
        GlobalSnackBars.map((snackbar) => {
            return (
                <Snackbar key={snackbar.id} snackbar={snackbar} id={snackbar.id}
                          removeSnackbar={removeSnackbar} snackbars={GlobalSnackBars}/>
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
