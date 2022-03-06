/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import './Dialog.css';
import {IoClose} from "react-icons/io5";

export default function Dialog({
                                   title = '',
                                   onClose, open, size = 'm',
                                   content, footer
                               }) {
    return (
        <div>
            {
                open ? <div className={'dialog'} onMouseDown={onClose}>
                    <div onMouseDown={(e) => {
                        e.stopPropagation();
                    }} className={`dialog__modal dialog__modal--${size}`}>
                        <div className={'dialog__modal__header'}>
                    <span className={'dialog__modal__header__title'}>
                        {title}
                    </span>
                            <span className={'dialog__modal__header__close'}>
                        <IoClose className={'button-icon'} onClick={onClose} size={50}/>
                    </span>
                        </div>
                        <div className={'dialog__modal__content'}>
                            {content}
                        </div>
                        <div className={'dialog__modal__footer'}>
                            {footer}
                        </div>
                    </div>
                </div> : <></>
            }
        </div>
    );
}