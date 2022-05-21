import {Rating} from "@mui/material";
import React from "react";

export default function CustomRating({rating, setRating, disabled=false}) {
    return <div className={'rating__container input__box'}>
        <span className={'rating__title'}>Rating: </span>
        <Rating
            readOnly={disabled}
            value={rating}
            onChange={(event, newValue) => {
                setRating && setRating(newValue);
            }}
        />
    </div>
}