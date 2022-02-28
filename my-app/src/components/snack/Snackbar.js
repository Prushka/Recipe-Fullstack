import * as React from 'react';
import './Snackbar.css';
import {IoClose} from "react-icons/io5";
import {useState} from "react";


class SnackbarProperties {
    constructor({text, timeout, type, position, id}) {
        this.text = text
        this.timeout = timeout
        this.type = type ? type : "default"
        this.position = position ? position : "bottom-left"
        this.id = id
    }
}

export function SnackBarManager() {
    const [snackbars, setSnackbars] = useState([
        new SnackbarProperties({id: 1, text: "test 1", timeout: 9000}),
        new SnackbarProperties({id: 2, text: "test 2", timeout: 8000, type: "success"}),
        new SnackbarProperties({id: 3, text: "test 3", timeout: 7000, type: "error"}),
        new SnackbarProperties({id: 4, text: "test 4", timeout: 6000, type: "success", position: "bottom-right"}),
        new SnackbarProperties({id: 5, text: "test 5", timeout: 5000, type: "success", position: "top-right"}),
        new SnackbarProperties({id: 6, text: "test 6", timeout: 4000, type: "success", position: "top-right"}),
        new SnackbarProperties({id: 7, text: "test 7", timeout: 3000, type: "success", position: "bottom-middle"}),
        new SnackbarProperties({id: 8, text: "test 8", timeout: 2000, type: "success", position: "bottom-middle"}),
    ])
    const [removedSnackbars] = useState(new Set())
    const removeSnackbar = (id) => {
        console.log("removing " + id)
        setSnackbars(snackbars.filter(sb => {
            return sb.id !== id
        }))
        removedSnackbars.add(id)
    }
    return (
        snackbars.filter((snackbar) => {
            return !removedSnackbars.has(snackbar.id)
        }).map((snackbar) => {
            return (
                <Snackbar key={snackbar.id} snackbar={snackbar} snackbarId={snackbar.id}
                          removeSnackbar={removeSnackbar} snackbars={snackbars}/>
            )
        })
    )
}

export function Snackbar({
                             snackbar,
                             snackbarId,
                             removeSnackbar, snackbars
                         }) {
    let index = 0
    snackbars.forEach((sb) => {
        if (sb.id < snackbarId && sb.position === snackbar.position) {
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
        setTimeout(() => {
            removeSnackbar(snackbarId)
        }, snackbar.timeout);
    }
    return (
        <div style={verticalStyle}
             className={`snackbar snackbar--shadow snackbar--${snackbar.position} snackbar--${snackbar.type}`}>
            <span>{snackbar.text}</span>
            <IoClose
                onClick={() => removeSnackbar(snackbarId)} size={25} className={'button-icon snackbar--close'}/>
        </div>
    )
}
