/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';

class ClickEvent{
    constructor(header, value, id, index, isHeader, entity) {
        this.header = header
        this.value = value
        this.id = id
        this.index = index
        this.isHeader = isHeader
        this.entity = entity
    }
}

export default function GridRow({
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
                                 onClickHandler(new ClickEvent(headers[index], value, id, index, isHeader, entity))
                                 }
                                 }
                                 key={`${id}_${index}`}>{child}</CTag>
                })
            }
        </tr>
    );
}