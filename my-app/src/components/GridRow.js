import * as React from 'react';

export default function GridRow({rowId, values, headers, isHeader=false,
                                    onClickHandler, clickableHeader=[]}) {

    return (
        <tr key={rowId}>
            {
                values.map((value, index) => {
                    const CTag = isHeader?`th`:`td`;
                    const cellClass = clickableHeader.includes(headers[index])?'grid--clickable':''
                    return <CTag className={cellClass} onClick={()=>onClickHandler(headers[index], value, rowId, index, isHeader)}
                               key={`${rowId}_${index}`}>{value}</CTag>
                })
            }
        </tr>
    );
}