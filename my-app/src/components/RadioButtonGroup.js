import * as React from 'react';
import '../styles/Input.css';
import GridRow from "./GridRow";

export function RadioButtonGroup({
                                     title,
                                     options,
     style
                                 }) {
    return (
        <>
            <radio-section style={{...style}}>
                <radio-section-title>{title}</radio-section-title>
                <spaced-horizontal-preferred>
                    {options.map(option => {
                        return (
                            <radio-option>
                                <span><input type={"radio"} id={option} name={title}/></span>
                                <radio-label>{option}</radio-label>
                            </radio-option>
                        )

                    })}
                </spaced-horizontal-preferred>
            </radio-section>

        </>

    );
}

