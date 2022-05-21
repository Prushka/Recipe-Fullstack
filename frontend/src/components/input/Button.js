/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import './Input.css';


export function RedBGButton(props) {
    return (<Button
        {...props}
        className={`button--red ${props.className}`}
        shadowOnHover={false}
    > {props.children} </Button>);
}


export function GreyBorderRedButton(props) {
    return (<Button
        {...props}
        className={`button--border button--border--black ${props.className}`}
        shadowOnHover={false}
    > {props.children} </Button>);
}

export function GreenBGButton(props) {
    return (
        <Button
            {...props}
            className={`button--green ${props.className}`}
            shadowOnHover={false}
        > {props.children} </Button>
    );
}

export function BlueBGButton(props) {
    return (
        <Button
            {...props}
            className={`button--purple ${props.className}`}
            shadowOnHover={false}
        > {props.children} </Button>
    );
}

// I removed the possibility to custom buttons further since inline-styles aren't allowed according to the handout
// styles have to be hardcoded to css classes
export function Button({
                           mobileFullWidth = true,
                           className = '',
                           shadowOnHover = true,
                           onHover = () => {
                           }, onClick = () => {
    }
                           , onMouseLeave = () => {
    }, children
                           , type = 'button'
                       }) {
    return (
        <button type={type}
                className={`button ${mobileFullWidth && 'mobile-full-width'} ${className} ${shadowOnHover ? 'button__focus-shadow' : ''}`}
                onMouseOver={onHover}
                onMouseLeave={onMouseLeave}
                onClick={onClick}>
            <span>{children}</span>
        </button>
    );
}

