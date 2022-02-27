/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import Grid from "./Grid";
import {useEffect, useState} from "react";
import Dialog from "../dialog/Dialog";
import {BlueBGButton, GreyBorderRedButton, RedBGButton} from "../input/Button";
import {TextField} from "../input/TextField";
import {SortFilterBar} from "../SortFilterBar";
import {RadioButtonGroup} from "../input/RadioButtonGroup";
import './Grid.css';


let clickableHeader = []
const cellCallbacks = []

export function AdDialog({dialog}) {
    const [dialogOpen, setDialogOpen] = useState(false)
    clickableHeader = clickableHeader.concat(dialog.supportedHeaders)
    cellCallbacks.push((header, value, id, cellId, isHeader) => {
        if (dialog.supportedHeaders.includes(header)) {
            dialog.setEditingEntity(dialog.data[value])
            setDialogOpen(true)
        }
    })
    return (
        <Dialog size={dialog.size} key={dialog.titleGetter()} title={dialog.titleGetter()}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                content={
                    dialog.contentGetter()
                }
                footer={
                    dialog.footerGetter()
                }
        />
    )
}

export default function AdvancedGrid({
                                         displayData,
                                         headerDialogs,
                                         cellCallback,
                                         searchableHeaders = [],
                                         excludeHeader = ['id']
                                     }) {

    if (cellCallback) {
        cellCallbacks.push(cellCallback)
    }
    let _displayData = []
    if (!Array.isArray(displayData)) {
        for (let key in displayData) {
            _displayData.push(displayData[key])
        }
        displayData = _displayData
    }

    const [searchValues, setSearchValues] = useState({});
    const [localDisplayData, setLocalDisplayData] = useState([...displayData]);
    useEffect(() => {
        setLocalDisplayData(displayData.filter((i) => {
            let pass = true
            for (let searchKey in searchValues) {
                if (searchValues[searchKey]) {
                    if (!i[searchKey]) {
                        return false
                    }
                    pass = pass && i[searchKey].toString().toLowerCase().includes(searchValues[searchKey])
                }
            }
            return pass
        }))
    }, [searchValues])


    const headers = []
    displayData.forEach((item) => {
        if (Object.keys(item).length > headers.length) {
            headers.length = 0
            for (let key in item) {
                if (!excludeHeader.includes(key)) {
                    headers.push(key)
                }
            }
        }
    })

    return (
        <>
            {
                headerDialogs && headerDialogs.map((dialog) => {
                    return <AdDialog dialog={dialog}/>
                })
            }

            <grid-search-bar>
                {
                    searchableHeaders.map((searchHeader) => {
                        return (
                            <TextField onChange={(e) => {
                                const newSearchValues = Object.assign({}, searchValues)
                                newSearchValues[searchHeader] = e.target.value
                                setSearchValues(newSearchValues)
                            }}
                                       label={`Search ${searchHeader}`} key={searchHeader}/>)
                    })
                }
            </grid-search-bar>
            <SortFilterBar style={{marginBottom: '20px'}}/>
            <Grid headers={headers} tableData={localDisplayData}
                  onClickHandler={(header, value, id, cellId, isHeader) => {
                      cellCallbacks.forEach((callback) => callback(header, value, id, cellId, isHeader))
                  }}
                  clickableHeader={clickableHeader}/>

        </>
    );
}
// <FiSearch className={'button-icon'} style={{marginTop: "40px", marginLeft: "30px"}} size={'40'}/>