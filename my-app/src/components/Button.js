import * as React from 'react';
import '../styles/Button.css';
import {useState} from "react";


export function RedBGButton(props) {
    return (<Button
        {...props}
        buttonBackgroundColor={'var(--theme-red)'}
        buttonHoverBackgroundColor={'var(--theme-dark-red)'}
    > {props.children} </Button>);
}


export function GreyBorderRedButton(props) {
    return (<Button
        {...props}
        buttonBorderColor={'var(--theme-gray)'}
        buttonHoverBorderColor={'var(--theme-dark-gray)'}
        shadowOnHover={false}
        textColor={'var(--theme-1)'}
    > {props.children} </Button>);
}

export function BlueBGButton(props) {
    return (
        <Button
            {...props}
            buttonBackgroundColor='var(--theme-purple)'
            buttonHoverBackgroundColor='var(--theme-dark-purple)'
        > {props.children} </Button>
    );
}


export function Button({
                           minWidth = '',
                           children = '',
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
            minWidth: minWidth ? minWidth : 'auto',
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
            {children}
        </div>
    );
}

