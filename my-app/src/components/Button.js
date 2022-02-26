import * as React from 'react';
import '../styles/Button.css';
import {useState} from "react";



export function Button({
                           textColor = 'white',
                           buttonBackgroundColor = '',
                           buttonHoverBackgroundColor = '',
                           shadowOnHover = true,
                           buttonBorderColor = '',
                           buttonHoverBorderColor = '',
                           onHover = () => {
                           }, onClick = () => {
    }
                       }) {


    const [buttonBGColor, setButtonBGColor] = useState(buttonBackgroundColor)
    const [buttonBColor, setButtonBColor] = useState(buttonBorderColor)
    const [buttonShadow, setButtonShadow] = useState('')
    return (
        <div className={`button ${buttonShadow}`} style={{
            color: textColor,
            backgroundColor: buttonBGColor,
            boxShadow: buttonShadow,
            border: (buttonBorderColor || buttonHoverBorderColor) ? `2px solid ${buttonBColor}` : ''
        }}
             onMouseOver={() => {
                 setButtonBGColor(buttonHoverBackgroundColor ? buttonHoverBackgroundColor : buttonBackgroundColor)
                 setButtonBColor(buttonHoverBorderColor ? buttonHoverBorderColor : buttonBorderColor)
                 if (shadowOnHover) {
                     setButtonShadow('button--shadow')
                 }
                 onHover()
             }}
             onMouseLeave={() => {
                 setButtonBGColor(buttonBackgroundColor)
                 setButtonBColor(buttonBorderColor)
                 if (shadowOnHover) {
                     setButtonShadow('')
                 }
             }}
             onClick={onClick}>
            sometext
        </div>
    );
}

