import * as React from 'react';
import '../styles/Button.css';
import {useState} from "react";

export function RedBGButton({children, onClick}) {
    return (<Button
        buttonBackgroundColor={'var(--theme-red)'}
        buttonHoverBackgroundColor={'var(--theme-dark-red)'}
        onClick={onClick}
    > {children} </Button>);
}


export function GreyBorderRedButton({children, onClick}) {
    return (<Button
        buttonBorderColor={'var(--theme-gray)'}
        buttonHoverBorderColor={'var(--theme-dark-gray)'}
        onClick={onClick}
        shadowOnHover={false}
        textColor={'var(--theme-1)'}
    > {children} </Button>);
}

export function BlueBGButton({children, onClick}) {
    return (
        <Button
            buttonBackgroundColor={'var(--theme-purple)'}
            buttonHoverBackgroundColor={'var(--theme-dark-purple)'}
            onClick={onClick}
        > {children} </Button>
    );
}


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

