import * as React from 'react';
import './Snackbar.css';
import {IoClose} from "react-icons/io5";
import {useContext} from "react";
import {SnackbarContext} from "../../App";


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
const sbs = [new SnackbarProperties({id: 1, text: "test 1", timeout: 9000}),
    new SnackbarProperties({id: 2, text: "test 2", timeout: 8000, type: "success"}),
    new SnackbarProperties({id: 3, text: "test 3", timeout: 7000, type: "error"}),
    new SnackbarProperties({
        id: 4,
        text: "test 4",
        timeout: 6000,
        type: "success",
        position: "bottom-right"
    }),
    new SnackbarProperties({id: 5, text: "test 5", timeout: 5000, type: "success", position: "top-right"}),
    new SnackbarProperties({id: 6, text: "test 6", timeout: 4000, type: "success", position: "top-right"}),
    new SnackbarProperties({
        id: 7,
        text: "test 7",
        timeout: 3000,
        type: "success",
        position: "bottom-middle"
    }),
    new SnackbarProperties({
        id: 8,
        text: "test 8",
        timeout: 2000,
        type: "success",
        position: "bottom-middle"
    })]

let GlobalSnackbars = [...sbs]
const addSnackbar= (snackbar)=>{
    GlobalSnackbars.push(snackbar)
}
const removeSnackbar = (id)=>{
    GlobalSnackbars = GlobalSnackbars.filter((sb) => {
        return sb.id !== id
    })
}
export {SnackbarProperties, addSnackbar, removeSnackbar}

export function SnackBarManager() {
    const snackbarsContext = useContext(SnackbarContext)
    const removeSnackbar = snackbarsContext.removeSnackbar
    return (
        GlobalSnackbars.map((snackbar) => {
            return (
                <Snackbar key={snackbar.id} snackbar={snackbar} id={snackbar.id}
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
