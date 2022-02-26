import * as React from 'react';
import '../styles/Dialog.css';
import {IoClose} from "react-icons/all";

export default function Dialog({
                                   title = '',
                                   onClose, open, size = 'm',
                                   minHeight = 'auto',
                                   minWidth = 'auto',
                                   maxHeight = 'auto',
                                   maxWidth = 'auto',
                                   children
                               }) {
    return (
        open ? <div className='dialog' onClick={onClose}>
            <div onClick={(e) => {
                e.stopPropagation();
            }} className={`modal modal--${size}`}
                 style={{
                     minHeight: minHeight,
                     minWidth: minWidth, maxHeight: maxHeight,
                     maxWidth: maxWidth
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
                        {children}
                    </div>
                </div>
            </div>
        </div> : <></>
    );
}