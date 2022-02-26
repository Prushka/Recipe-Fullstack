import * as React from 'react';
import '../styles/Input.css';

export function TextField(props) {
    return (
        <div className={'input--text-group'}>
            {props.label && <label htmlFor={props.id}>{props.label}</label>}
            <input id={props.id} type="text" name="name"
                   placeholder={props.placeholder} style={{...props.style}}
                   />
        </div>
    );
}

