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
        <div>
            {
                open ? <div className={'dialog-modal'} onMouseDown={onClose}>
                    <div onMouseDown={(e) => {
                        e.stopPropagation();
                    }} className={`modal modal--${size}`}
                         style={{
                             ...style
                         }}>
                        <modal-header>
                    <span className={'modal--title'}>
                        {title}
                    </span>
                            <span className={'modal--close'}>
                        <IoClose className={'button-icon'} onClick={onClose} size={50}/>
                    </span>
                        </modal-header>
                        <modal-content>
                            {content}
                        </modal-content>
                        <modal-footer>
                            {footer}
                        </modal-footer>
                    </div>
                </div> : <></>
            }
        </div>
    );
}