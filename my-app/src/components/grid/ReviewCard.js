/*
 * Copyright 2022 Dan Lyu.
 */

import './Card.css'
import * as React from 'react';
import {ClickEvent} from "./ClickEvent";
import {Rating} from "@mui/material";
import {BsFillHandThumbsUpFill, BsFillHandThumbsDownFill} from "react-icons/bs";

export default function ReviewCard({
                                       onClickVote,
                                       sortValues, setSortValues,
                                       id, values, headers, isHeader = false,
                                       entity,
                                       onClickHandler, clickableHeader = [],
                                       userPreVote
                                   }) {
    const clickEvent = new ClickEvent(null, null, id, null, isHeader, entity)
    const preVote = userPreVote(entity)
    const prePositivity = preVote ? preVote.positivity : null
    return (
        <div onClick={() => onClickHandler(clickEvent)} key={id}
             className={'custom__card review__card'}>
            <div className={'review__card__header'}>
                <div className={"review__card__avatar__container"}>
                    <img className={'avatar'} src={entity.authorAvatar} alt='avatar'/>
                </div>
                <span>{entity.authorName}</span>
                <div className={'review__card__voting__container'}>
                    <div className={'review__card__voting__icon__container'}>
                        <BsFillHandThumbsUpFill
                            onClick={(e) => {
                                e.stopPropagation()
                                onClickVote(entity, 1)
                            }}
                            className={`review__card__voting__icon ${prePositivity === 1 && 'review__card__voting__icon--selected'}`} size={23}/>
                        <div className={'review__card__voting__text'}>{entity.upVotes}</div>
                    </div>

                    <div className={'review__card__voting__icon__container'}>
                        <BsFillHandThumbsDownFill
                            onClick={(e) => {
                                e.stopPropagation()
                                onClickVote(entity, -1)
                            }}
                            className={`review__card__voting__icon ${prePositivity === -1 && 'review__card__voting__icon--selected'}`} size={23}/>
                        <div className={'review__card__voting__text'}>{entity.downVotes}</div>
                    </div>
                </div>
            </div>
            <Rating className={'review__card__rating'} name="read-only" value={entity.rating} readOnly/>
            <div content={'review__card__content'}>{entity.content}</div>

        </div>
    );
}