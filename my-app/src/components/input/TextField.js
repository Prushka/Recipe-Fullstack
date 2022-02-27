/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import './Input.css';

export function TextField(props) {
    return (
        <div className={'textfield-section'} style={{...props.style}}>
            {props.label && <label htmlFor={props.id}>{props.label}</label>}
            <input id={props.id} type="text" name={props.name}
                   placeholder={props.placeholder} {...props}
                   />
        </div>
    );
}

