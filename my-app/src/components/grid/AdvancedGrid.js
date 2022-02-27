/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import Grid from "./Grid";
import {useEffect, useState} from "react";
import Dialog from "../dialog/Dialog";
import {TextField} from "../input/TextField";
import {SortFilterBar} from "../SortFilterBar";
import './Grid.css';


export default function AdvancedGrid({
                                         displayData,
                                         headerDialogs = [],
                                         cellCallback,
                                         searchableHeaders = [],
                                         excludeHeader = ['id']
                                     }) {
    let clickableHeader = []
    const cellCallbacks = []
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

    const [dialogsOpen, setDialogsOpen] = useState({})

    const setAddDialog = (uid, value) => {
        const newDialogsOpen = {...dialogsOpen};
        newDialogsOpen[uid] = value;
        setDialogsOpen(newDialogsOpen);
    }

    return (
        <>
            {
                headerDialogs.map((dialog) => {
                    clickableHeader = clickableHeader.concat(dialog.supportedHeaders)
                    cellCallbacks.push((e) => {
                        if (dialog.supportedHeaders.includes(e.header)) {
                            dialog.setEditingEntity(e.entity)
                            setAddDialog(dialog.uid, true)
                        }
                    })
                    return (
                        <Dialog size={dialog.size} key={dialog.uid} title={dialog.titleGetter()}
                                open={dialogsOpen[dialog.uid]}
                                onClose={() => setAddDialog(dialog.uid, false)}
                                content={
                                    dialog.contentGetter()
                                }
                                footer={
                                    dialog.footerGetter()
                                }
                        />
                    )
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
                  onClickHandler={(e) => {
                      cellCallbacks.forEach((callback) => callback(e))
                  }}
                  clickableHeader={clickableHeader}/>

        </>
    );
}
// <FiSearch className={'button-icon'} style={{marginTop: "40px", marginLeft: "30px"}} size={'40'}/>