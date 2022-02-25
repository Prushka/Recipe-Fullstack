import * as React from 'react';

export default function GridRow({uid, values, isHeader}) {

    GridRow.defaultProps = {
        isHeader: false
    }

    return (
        <tr key={uid}>
            {
                values.map((value, index) => {
                    if(isHeader){
                        return <th key={`${uid}_${index}`}>{value}</th>
                    }
                    return <td key={`${uid}_${index}`}>{value}</td>
                })
            }
        </tr>
    );
}