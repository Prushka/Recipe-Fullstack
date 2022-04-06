/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import './Input.css';

export function TextField({
                              onChange = () => {
                              },
                              disabled = false,
                              textFieldClassName = '',
                              children,
                              type = 'text',
                              label,
                              id,
                              className,
                              value = "",
                              setValue,
                              placeholder = "",
                              name,
                              size = 's'
                          }) {
    const combinedClassName = `input__box textfield-section__input textfield-section__input--${size} ${className}`
    const combinedOnChange = e => {
        if (setValue) {
            setValue(e.target.value)
        }
        onChange(e)
    }
    return (
        <div className={`input__container textfield-section ${textFieldClassName}`}>
            <div className={`textfield-header`}>
                {label && <label htmlFor={id}>{label}</label>}
                {children}
            </div>
            {size === 's' ? <input value={value ?? ""} disabled={disabled}
                                   onChange={combinedOnChange}
                                   className={combinedClassName} id={id} name={name}
                                   placeholder={placeholder}
                                   type={type}
            /> : <textarea value={value ?? ""} disabled={disabled}
                           onChange={combinedOnChange}
                           className={combinedClassName} id={id} name={name}
                           placeholder={placeholder}
            />}
        </div>
    );
}

