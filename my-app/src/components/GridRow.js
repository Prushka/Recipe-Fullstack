import * as React from 'react';

export default function GridRow({values, isHeader}) {

    GridRow.defaultProps = {
        isHeader: false
    }

    return (
        <tr>
            {
                values.map(value => {
                    if(isHeader){
                        return <th>{value}</th>
                    }
                    return <td>{value}</td>
                })
            }
        </tr>
    );
}