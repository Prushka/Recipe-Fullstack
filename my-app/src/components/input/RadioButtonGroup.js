/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import './Input.css';

export function RadioButtonGroup({
                                     title,
                                     options,
                                     selected, className = ''
                                 }) {
    return (
        <>
            <div className={`radio-section ${className}`}>
                <div className={'radio-section-title'}>{title}</div>
                <spaced-horizontal-preferred>
                    {options.map(option => {
                        let checked = false
                        if (selected === option) {
                            checked = true
                        }
                        return (
                            <div className={'radio-option'} key={option}>
                                <span><input defaultChecked={checked} type={"radio"} id={option} name={title}/></span>
                                <div className={'radio-label'}>{option}</div>
                            </div>
                        )

                    })}
                </spaced-horizontal-preferred>
            </div>

        </>

    );
}

