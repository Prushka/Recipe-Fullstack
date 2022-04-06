import {Autocomplete, TextField as MuiTextField} from "@mui/material";
import {withStyles} from "@mui/styles";
import React from "react";

export default function DropdownTextField({value, setValue, options, label, className, textFieldClassName}) {
    // It's impossible to do this using only css classes
    const CustomTextField = withStyles({
        root: {
            '& label': {
                color: 'black',
                fontFamily: "Roboto, serif"
            },
            '& label.Mui-focused': {
                color: 'var(--theme-dark-purple)'
            },
            '& .MuiInput-underline:after': {
                border: '2px solid var(--theme-dark-purple)',
            },
            '& .MuiOutlinedInput-root': {
                padding: '16px 20px 15px 17px',
                fontFamily: "Roboto, serif",
                '& fieldset': {
                    border: '2px solid',
                    borderRadius: '8px'
                },
                '&:hover fieldset': {
                    border: '2px solid var(--theme-dark-purple)',
                },
                '&.Mui-focused fieldset': {
                    border: '2px solid var(--theme-dark-purple)',
                },
            },
        },
    })(MuiTextField);
    return <div className={`input__container textfield-section ${textFieldClassName}`}>
        <Autocomplete
        disablePortal
        id="recipe-category-dropdown"
        options={options}
        className={`${className}`}
        value={value}
        onChange={(e, newValue) => {
            setValue(newValue)
        }}
        renderInput={(params) => {
            return (
                    <CustomTextField {...params}
                                  className={'autocomplete'}
                                  label={label}/>
                )
        }
        }
    />
    </div>
}