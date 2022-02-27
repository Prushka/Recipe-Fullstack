/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import {useEffect, useState} from "react";
import Dialog from "../dialog/Dialog";
import {TextField} from "../input/TextField";
import {SortFilterBar} from "../SortFilterBar";
import './Grid.css';
import {setAddState} from "../../util";
import Grid from "./Grid";


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
    const [sortValues, setSortValues] = useState({});
    const [localDisplayData, setLocalDisplayData] = useState([...displayData]);
    useEffect(() => {
        const _displayData = [...displayData]

        let sortHeader = null
        let sortDirection = -1
        for (let key in sortValues) {
            if (sortValues[key] !== 2) {
                sortHeader = key
                sortDirection = sortValues[key]
            }
        }
        _displayData.sort(function (a, b) {
            if (a[sortHeader] < b[sortHeader]) return sortDirection === 1 ? 1 : -1;
            if (a[sortHeader] > b[sortHeader]) return sortDirection === 1 ? -1 : 1;
            return 0;
        });

        setLocalDisplayData(_displayData.filter((i) => {
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
    }, [searchValues, sortValues])

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


    return (
        <>
            {
                headerDialogs.map((dialog) => {
                    clickableHeader = clickableHeader.concat(dialog.supportedHeaders)
                    cellCallbacks.push((e) => {
                        if (dialog.supportedHeaders.includes(e.header)) {
                            dialog.setEditingEntity(e.entity)
                            setAddState(dialog.uid, true, dialogsOpen, setDialogsOpen)
                        }
                    })
                    return (
                        <Dialog size={dialog.size} key={dialog.uid} title={dialog.titleGetter()}
                                open={dialogsOpen[dialog.uid]}
                                onClose={() => setAddState(dialog.uid, false, dialogsOpen, setDialogsOpen)}
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
                                setAddState(searchHeader, e.target.value, searchValues, setSearchValues)
                            }}
                                       label={`Search ${searchHeader}`} key={searchHeader}/>)
                    })
                }
            </grid-search-bar>
            <Grid sortValues={sortValues} setSortValues={setSortValues} headers={headers} tableData={localDisplayData}
                  onClickHandler={(e) => {
                      cellCallbacks.forEach((callback) => callback(e))
                  }}
                  clickableHeader={clickableHeader}/>

        </>
    );
}
// <SortFilterBar style={{marginBottom: '20px'}}/>
// <FiSearch className={'button-icon'} style={{marginTop: "40px", marginLeft: "30px"}} size={'40'}/>