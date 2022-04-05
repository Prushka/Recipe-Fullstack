/*
 * Copyright 2022 Dan Lyu.
 */

import '../Edit.css';
import {TextField} from "../../components/input/TextField";
import React, {useState} from "react";
export default function EditReview({review, setEditingReview}){
    const [content, setContent] = useState(review.content)
    return (
        <>
            <TextField value={content} setValue={setContent}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Content'}/>
        </>
    )
}