import * as React from 'react';
import './Snackbar.css';
import {IoClose} from "react-icons/io5";
import {useState} from "react";


export function Snackbar({open = true,
                         position="bottom-middle",
                         type="error"}) {
    const [snackBarOpen, setSnackbarOpen] = useState(open);
    return (
        <div>
            {snackBarOpen ? <div className={`snackbar snackbar--${position} snackbar--${type}`}>
                <span>test</span>
                <IoClose
                    onClick={()=>setSnackbarOpen(false)} size={25} className={'button-icon snackbar--close'}/>
            </div> : <></>}

        </div>
    )
}
