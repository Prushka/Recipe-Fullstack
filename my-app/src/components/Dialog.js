import * as React from 'react';
import '../styles/Dialog.css';

export default function Dialog({size='m',
                               minHeight='auto',
                               minWidth='auto',
                               maxHeight='auto',
                               maxWidth='auto'}) {
    return (
        <div className='dialog'>
            <div className={`modal modal--${size}`}
            style={{minHeight:minHeight,
            minWidth:minWidth,maxHeight:maxHeight,
            maxWidth:maxWidth}}>
            </div>
        </div>
    );
}