import * as React from 'react';

export default function GridRow({rowId, values, headers, isHeader=false,
                                    onClickHandler, clickableHeader}) {

    return (
        <tr key={rowId}>
            {
                values.map((value, index) => {
                    const CTag = isHeader?`th`:`td`;
                    return <CTag onClick={()=>onClickHandler(headers[index], value, rowId, index, isHeader)}
                               key={`${rowId}_${index}`}>{value}</CTag>
                })
            }
        </tr>
    );
}