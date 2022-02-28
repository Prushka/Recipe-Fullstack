import * as React from 'react';
import './Snackbar.css';
import {IoClose} from "react-icons/io5";
import {useEffect, useState} from "react";

let snackbarIds = 0
const snackbars = new Set()
const getSnackBarNewId = () => {
    snackbarIds = snackbarIds + 1
    return snackbarIds
}

export {getSnackBarNewId}

export function Snackbar({
                             open = true,
                             position = "bottom-middle",
                             type = "error",
                             timeout = -1,
                             snackbarId
                         }) {
    const [snackBarOpen, setSnackbarOpen] = useState(open)
    snackbars.add(snackbarId)
    const [append] = useState([...snackbars].indexOf(snackbarId) * 65)
    const checkSet = (newState) => {
        // I'm not sure if setState will update if the value's the same
        // This is just to make sure we don't trigger useEffect multiple times
        if (snackBarOpen === newState) {
            return
        }
        setSnackbarOpen(newState)
    }
    useEffect(() => {
        if (!snackBarOpen) {
            snackbars.delete(snackbarId)
        }
    }, [snackbarId, snackBarOpen])
    console.log(snackbars)
    if (timeout > 0) {
        setTimeout(() => {
            checkSet(false);
        }, timeout);
    }
    return (
        <div>
            {snackBarOpen ?
                <div style={{bottom: `${append}px`}} className={`snackbar snackbar--${position} snackbar--${type}`}>
                    <span>test</span>
                    <IoClose
                        onClick={() => checkSet(false)} size={25} className={'button-icon snackbar--close'}/>
                </div> : <></>}
        </div>
    )
}
