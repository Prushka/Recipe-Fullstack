/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import './Input.css';

export function RadioButtonGroup({
                                     title,
                                     options,
                                     selected, setSelected, className = '',
    disabled=false
                                 }) {
    return (
        <>
            <div className={`radio-section input__box ${className}`}>
                <div className={'radio-section-title'}>{title}</div>
                <spaced-horizontal-preferred>
                    {options.map(option => {
                        return (
                            <div className={'radio-option'} key={option}>
                                <span><input disabled={disabled}
                                    onChange={(e) => {
                                        setSelected && setSelected(e.target.id)
                                    }}
                                    defaultChecked={selected === option} type={"radio"} id={option}
                                    name={title}/></span>
                                <div className={'radio-label'}>{option}</div>
                            </div>
                        )

                    })}
                </spaced-horizontal-preferred>
            </div>

        </>

    );
}

