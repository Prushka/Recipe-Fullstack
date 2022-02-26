import * as React from 'react';

export default function GridRow({id, values, headers, isHeader=false,
                                    onClickHandler, clickableHeader=[]}) {

    return (
        <tr key={id}>
            {
                values.map((value, index) => {
                    const CTag = isHeader?`th`:`td`;
                    const cellClass = clickableHeader.includes(headers[index])?'grid--clickable':''
                    return <CTag className={cellClass} onClick={()=>onClickHandler(headers[index], value, id, index, isHeader)}
                               key={`${id}_${index}`}>{value}</CTag>
                })
            }
        </tr>
    );
}