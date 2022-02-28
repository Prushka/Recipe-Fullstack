import * as React from 'react';
import './Snackbar.css';
import {IoClose} from "react-icons/io5";


export function Snackbar({}) {
    return (
        <>
            <div className={'snackbar'}>
                <span>test</span>
                <IoClose size={25} className={'button-icon snackbar--close'}/>
            </div>
        </>
    )
}
