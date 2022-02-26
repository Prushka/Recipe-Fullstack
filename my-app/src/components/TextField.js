import * as React from 'react';
import '../styles/Input.css';

export function TextField(props) {
    return (
        <textfield-section style={{...props.style}}>
            {props.label && <label htmlFor={props.id}>{props.label}</label>}
            <input id={props.id} type="text" name="name"
                   placeholder={props.placeholder} {...props}
                   />
        </textfield-section>
    );
}

