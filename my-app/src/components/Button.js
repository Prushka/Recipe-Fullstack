import * as React from 'react';
import '../styles/Button.css';
import {useState} from "react";

export default function Button({
                                   buttonBackgroundColor = '#8688BC',
                                   buttonHoverBackgroundColor = '#5a5d95'
                               }) {

    const [buttonBGColor, setButtonBGColor] = useState(buttonBackgroundColor)
    return (
        <div className='button' style={{backgroundColor: buttonBGColor}}
             onMouseOver={() => setButtonBGColor(buttonHoverBackgroundColor)}
             onMouseLeave={() => setButtonBGColor(buttonBackgroundColor)}>
            sometext
        </div>
    );
}