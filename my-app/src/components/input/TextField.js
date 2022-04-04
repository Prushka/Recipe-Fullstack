/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import './Input.css';

export function TextField({type='text', label, id, className, value, setValue, placeholder="", name}) {
    return (
        <div className={`textfield-section`}>
            {label && <label htmlFor={id}>{label}</label>}
            <input value={value}
                   onChange={e => setValue(e.target.value)}
                   className={`textfield-section__input ${className}`} id={id} name={name}
                   placeholder={placeholder}
                   type={type}
            />
        </div>
    );
}

