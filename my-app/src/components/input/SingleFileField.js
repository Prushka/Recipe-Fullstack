import React from "react";

export default function SingleFileField({className='',title='Upload',file, setFile}) {
    return <div className={`input__box single-file-upload__container ${className}`}>
        <span className={'single-file-upload__title'}>{title}: </span>
        <input type="file" id="img" name="img" accept="image/*"
               onChange={(e) => {
                   setFile(e.target.files[0])
               }}/>
    </div>
}