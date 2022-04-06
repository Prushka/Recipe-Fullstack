/*
 * Copyright 2022 Dan Lyu.
 */

import {TextField} from "./TextField";
import {useState} from "react";
import {BlueBGButton} from "./Button";
import {uid} from "react-uid";
import {useSnackbar} from "notistack";
import {FiDelete} from "react-icons/fi";
import * as React from "react";
import {snackBarHandleError} from "../../util";

export default function ListInput({list, setList, label, className, disabled = false}) {
    const {enqueueSnackbar} = useSnackbar()

    const [value, setValue] = useState()

    return <div className={`list__container input__box ${className}`}>
        {disabled && <div className={`textfield-header`}>
            <span>{label}:</span>
        </div>}
        {!disabled && <div className={'list__input'}>
            <TextField textFieldClassName='list__input__textfield' label={label} value={value} setValue={setValue}/>
            <BlueBGButton
                onClick={() => {
                    if (!value) {
                        snackBarHandleError(enqueueSnackbar, `Cannot add an empty item`)
                    } else {
                        setList && setList([...list, value])
                        setValue('')
                    }
                }
                }
                mobileFullWidth={false} className='list__input__button'>Add item</BlueBGButton>
        </div>}

        <div className={'list__items'}>
            {list.map((l, index) => {
                return <div
                    onClick={() => {
                        setList && setList(list.filter((l, _index) => {
                            return _index !== index
                        }))
                    }
                    }
                    className={'list__items__item'} key={uid(l, index)}>
                    <span>{l}</span> {!disabled && <FiDelete className={'list__items__icon'}/>}
                </div>
            })}
        </div>

    </div>
}