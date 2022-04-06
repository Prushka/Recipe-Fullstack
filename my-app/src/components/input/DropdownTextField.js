import {categories} from "../../util";
import {Autocomplete, TextField as MuiTextField} from "@mui/material";
import React from "react";

export default function DropdownTextField({value, setValue, options, label, className, textFieldClassName}) {
    return <Autocomplete
        disablePortal
        id="recipe-category-dropdown"
        options={options}
        className={`autocomplete ${className}`}
        value={value}
        onChange={(e, newValue) => {
            setValue(newValue)
        }}
        renderInput={(params) => {
            return (
                <div className={`textfield-section ${textFieldClassName}`}>
                    <MuiTextField {...params}
                                  className={'textfield-section__input input__box'}
                                  label={label}/>
                </div>)
        }
        }
    />
}