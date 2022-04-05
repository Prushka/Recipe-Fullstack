/*
 * Copyright 2022 Dan Lyu.
 */

import '../Edit.css';
import {TextField} from "../../components/input/TextField";
import React, {useState} from "react";

export default function EditReview({review, setEditingReview}) {
    const [content, setContent] = useState(review.content)
    return (
        <div className={'edit__container'}>

            <TextField value={review._id}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Review Id'} disabled={true}/>

            <TextField value={review.reviewedRecipe}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Reviewed Recipe'} disabled={true}/>

            <TextField value={content} setValue={setContent}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Content'}/>
        </div>
    )
}