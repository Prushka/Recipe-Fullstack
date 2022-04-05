/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import './Grid.css';
import GridRow from "./GridRow";


export default function Grid({
                                 headers, tableData, sortValues, setSortValues, onClickHandler,
                                 clickableHeader = []
                             }) {
    return (
        <table>
            <tbody>
            <GridRow sortValues={sortValues} setSortValues={setSortValues} key={-1} id={-1} headers={headers}
                     values={headers} isHeader={true}
                     onClickHandler={onClickHandler} entity={headers}/>
            {tableData.map(value => {
                const rowValues = []
                headers.forEach((item) => {
                    if (Array.isArray(value[item])) {
                        rowValues.push(`Count: ${value[item].length}`)
                    } else if (value[item] != null) {
                        rowValues.push(value[item].toString())
                    } else {
                        rowValues.push("")
                    }
                })
                const id = value["id"] ?? value["_id"]
                return <GridRow key={id} id={id} entity={value} values={rowValues}
                                headers={headers}
                                onClickHandler={onClickHandler}
                                clickableHeader={clickableHeader}/>
            })}
            </tbody>
        </table>
    );
}