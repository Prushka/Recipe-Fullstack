import * as React from 'react';

export default function GridRow({rowId, values, headers, isHeader=false, onClickHandler}) {

    return (
        <tr key={rowId}>
            {
                values.map((value, index) => {
                    if(isHeader){
                        return <th onClick={()=>onClickHandler(headers[index],value, rowId, index, isHeader)}
                                   key={`${rowId}_${index}`}>{value}</th>
                    }
                    return <td onClick={()=>onClickHandler(headers[index], value, rowId, index, isHeader)}
                               key={`${rowId}_${index}`}>{value}</td>
                })
            }
        </tr>
    );
}