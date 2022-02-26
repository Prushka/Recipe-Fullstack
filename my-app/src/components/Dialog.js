import * as React from 'react';
import '../styles/Dialog.css';
import {MdClose} from "react-icons/all";

export default function Dialog({onClose, open, size = 'm',
                                   minHeight = 'auto',
                                   minWidth = 'auto',
                                   maxHeight = 'auto',
                                   maxWidth = 'auto'
                               }) {
    return (
        open ? <div className='dialog' onClick={onClose}>
            <div onClick={(e) => {
                e.stopPropagation();}} className={`modal modal--${size}`}
                 style={{
                     minHeight: minHeight,
                     minWidth: minWidth, maxHeight: maxHeight,
                     maxWidth: maxWidth
                 }}>
                <div className={'modal--top-bar'}>
                    <span className={'modal--title'}>
                        test
                    </span>
                    <span className={'modal--close'}>
                        <MdClose style={{cursor: 'pointer'}} onClick={onClose} size={50}/>
                    </span>
                </div>
            </div>
        </div> : <></>
    );
}