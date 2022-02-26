/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import '../styles/Input.css';

export function RadioButtonGroup({
                                     title,
                                     options,
     style, selected
                                 }) {
    return (
        <>
            <radio-section style={{...style}}>
                <radio-section-title>{title}</radio-section-title>
                <spaced-horizontal-preferred>
                    {options.map(option => {
                        let checked = false
                        if(selected === option){
                            checked = true
                        }
                        return (
                            <radio-option key={option}>
                                <span><input defaultChecked={checked} type={"radio"} id={option} name={title}/></span>
                                <radio-label>{option}</radio-label>
                            </radio-option>
                        )

                    })}
                </spaced-horizontal-preferred>
            </radio-section>

        </>

    );
}

