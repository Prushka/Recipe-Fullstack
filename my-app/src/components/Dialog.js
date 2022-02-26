import * as React from 'react';
import '../styles/Dialog.css';

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
                    <h1 className={'modal--title'}>
                        test
                    </h1>
                </div>
            </div>
        </div> : <></>
    );
}