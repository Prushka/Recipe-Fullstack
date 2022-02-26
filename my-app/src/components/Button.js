import * as React from 'react';
import '../styles/Input.css';
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
        buttonBackgroundColor={'rgba(0,0,0,0)'}
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
                           textColor = 'white',
                           buttonBackgroundColor = '',
                           buttonHoverBackgroundColor = '',
                           shadowOnHover = true,
                           buttonBorderColor = '',
                           buttonHoverBorderColor = '',
                           onHover = () => {
                           }, onClick = () => {
    }
                           , style, children
                       }) {


    const [buttonBGColor, setButtonBGColor] = useState(buttonBackgroundColor)
    const [buttonBColor, setButtonBColor] = useState(buttonBorderColor)
    const [buttonShadow, setButtonShadow] = useState('')
    return (
        <div className={`button ${buttonShadow}`} style={{
            ...style,
            minWidth: minWidth ? minWidth : 'auto',
            color: textColor,
            backgroundColor: buttonBGColor,
            boxShadow: buttonShadow,
            padding: (buttonBorderColor || buttonHoverBorderColor) ? '13px 21px 13px 21px' : '15px 23px 15px 23px',
            border: (buttonBorderColor || buttonHoverBorderColor) ? `2px solid ${buttonBColor}` : ''
        }}
             onMouseOver={() => {
                 setButtonBGColor(buttonHoverBackgroundColor ? buttonHoverBackgroundColor : buttonBackgroundColor)
                 setButtonBColor(buttonHoverBorderColor ? buttonHoverBorderColor : buttonBorderColor)
                 if (shadowOnHover) {
                     setButtonShadow('focus--shadow')
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
            <span>{children}</span>
        </div>
    );
}

