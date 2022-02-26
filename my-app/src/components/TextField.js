import * as React from 'react';
import '../styles/Input.css';
import {useState} from "react";

export function TextField(props) {
    return (
        <div style={{display: "flex", flexDirection: 'column'}}>
            {props.label && <label htmlFor={props.id}>{props.label}</label>}
            <input id={props.id} type="text" name="name"
                   placeholder={props.placeholder} style={{...props.style}}
                   />
        </div>
    );
}

