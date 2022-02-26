/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import './Dialog.css';
import {IoClose} from "react-icons/io5";

export default function Dialog({
                                   title = '',
                                   onClose, open, size = 'm',
                                   content, footer, style
                               }) {
    return (
        open ? <div className='dialog' onMouseDown={onClose}>
            <div onMouseDown={(e) => {
                e.stopPropagation();
            }} className={`modal modal--${size}`}
                 style={{
                     ...style
                 }}>
                <div className={'modal--container'}>
                    <div className={'modal--top-bar'}>
                    <span className={'modal--title'}>
                        {title}
                    </span>
                        <span className={'modal--close'}>
                        <IoClose style={{cursor: 'pointer'}} onClick={onClose} size={50}/>
                    </span>
                    </div>
                    <div className='modal--content'>
                        {content}
                    </div>
                    <div className='modal--bottom-bar'>
                        {footer}
                    </div>
                </div>
            </div>
        </div> : <></>
    );
}