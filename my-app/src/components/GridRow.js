import * as React from 'react';

export default function GridRow({
                                    id, values, headers, isHeader = false,
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
                    images.forEach((image) => {
                        if (value.endsWith(image)) {
                            child = <img className={'grid--avatar'} src={value} alt={value}/>
                        }
                    })
                    return <CTag className={`${cellClass} ${child !== value && 'grid--avatar-container'}`}
                                 onClick={() => onClickHandler(headers[index], value, id, index, isHeader)}
                                 key={`${id}_${index}`}>{child}</CTag>
                })
            }
        </tr>
    );
}