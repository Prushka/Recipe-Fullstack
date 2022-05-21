/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import './Grid.css';
import GridRow from "./GridRow";
import {uid} from "react-uid";


export default function Grid({customEntityContainerClassName,
                                 listArrayHeaders = [],
                                 headers, tableData, sortValues, setSortValues, onClickHandler,
                                 clickableHeader = [], customEntityRenderer
                             }) {
    const getRenderedItem = () => {
        return <>{tableData.map(value => {
            const rowValues = []
            headers.forEach((item) => {
                if (Array.isArray(value[item])) {
                    if (listArrayHeaders.includes(item)) {
                        rowValues.push(`[${value[item].join(',')}]`)
                    } else {
                        rowValues.push(`Count: ${value[item].length}`)
                    }
                } else if (value[item] != null) {
                    rowValues.push(value[item].toString())
                } else {
                    rowValues.push("")
                }
            })
            const id = value["id"] ?? value["_id"] ?? uid(value)
            const _props = {
                key: id,
                id: id,
                entity: value,
                values: rowValues,
                headers: headers,
                onClickHandler: onClickHandler,
                clickableHeader: clickableHeader
            }
            if (customEntityRenderer) {
                return customEntityRenderer(_props)
            }
            return (<GridRow {..._props}/>)
        })}</>
    }
    return (
        <div className={'flex-column'}>
            <table>
                <tbody>
                <GridRow sortValues={sortValues} setSortValues={setSortValues} key={-1} id={-1} headers={headers}
                         values={headers} isHeader={true}
                         onClickHandler={onClickHandler} entity={headers}/>
                {!customEntityRenderer && getRenderedItem()}
                </tbody>
            </table>
            <div className={`overflow ${customEntityContainerClassName}`}>
                {customEntityRenderer && getRenderedItem()}
            </div>
        </div>
    );
}