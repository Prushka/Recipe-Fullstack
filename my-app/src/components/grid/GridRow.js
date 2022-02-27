/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import {setAddState} from "../../util";

class ClickEvent {
    constructor(header, value, id, cellId, isHeader, entity) {
        this.header = header
        this.value = value
        this.id = id
        this.cellId = cellId
        this.isHeader = isHeader
        this.entity = entity
    }
}

export default function GridRow({
                                    sortValues, setSortValues,
                                    id, values, headers, isHeader = false,
                                    entity,
                                    onClickHandler, clickableHeader = []
                                }) {
    const images = ['.jpg', '.png']
    return (
        <tr key={id}>
            {
                values.map((value, index) => {
                    const CTag = isHeader ? `th` : `td`;
                    const cellClass = clickableHeader.includes(headers[index]) ? 'grid--clickable' : ''
                    let child = value
                    // TODO: use checkbox for boolean
                    images.forEach((image) => {
                        if (typeof value === 'string' && value.endsWith(image)) {
                            child = <img className={'grid--avatar'} src={value} alt={value}/>
                        }
                    })
                    return <CTag className={`${cellClass} ${child !== value && 'grid--avatar-container'}`}
                                 onClick={() => {
                                     if (sortValues && isHeader) {
                                         setAddState(value, sortValues[value] < 2 ? sortValues[value] + 1 : 0, sortValues, setSortValues)
                                     }
                                     onClickHandler(new ClickEvent(headers[index], value, id, index, isHeader, entity))
                                 }
                                 }
                                 key={`${id}_${index}`}>{child}</CTag>
                })
            }
        </tr>
    );
}