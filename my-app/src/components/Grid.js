import * as React from 'react';
import '../styles/Grid.css';
import GridRow from "./GridRow";

export default function Grid({tableData, onClickHandlers}) {
    const headers = []
    tableData.forEach((item) => {
        if(Object.keys(item).length > headers.length){
            headers.length = 0
            for (let key in item) {
                headers.push(key)
            }
        }
    })
    return (
        <div className="grid">
            <table>
                <tbody>
                <GridRow key={-1} uid={-1} values={headers} isHeader={true} onClickHandlers={onClickHandlers}/>
                {tableData.map(value => {
                    const rowValues = []
                    headers.forEach((item) => {
                        if(value[item]){
                            rowValues.push(value[item])
                        }else{
                            rowValues.push("")
                        }
                    })
                    return <GridRow key={value["rowId"]} uid={value["rowId"]} values={rowValues}
                                    onClickHandlers={onClickHandlers}/>
                })}
                </tbody>
            </table>
        </div>
    );
}