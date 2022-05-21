/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import './Dialog.css';
import Dialog from "./Dialog";
import {BlueBGButton, RedBGButton} from "../input/Button";

export default function ConfirmationDialog({
                                               title,
                                               open,
                                               setOpen,
                                               content = "You cannot undo this operation.",
                                               onConfirm = async () => {
                                               }
                                           }) {
    return (
        <Dialog size={'s'} title={title} open={open} onClose={() => setOpen(false)}
                content={
                    <div className={'confirmation__content'}>{content}</div>
                }
                footer={
                    <div className={'confirmation__button-group'}>
                        <BlueBGButton onClick={() => setOpen(false)}>CANCEL</BlueBGButton>
                        <RedBGButton onClick={async () => {
                            await onConfirm()
                            setOpen(false)
                        }
                        }>CONFIRM</RedBGButton>
                    </div>
                }
        >
        </Dialog>
    );
}