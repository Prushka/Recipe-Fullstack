/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import Grid from "../components/Grid";
import {useEffect, useState} from "react";
import Dialog from "../components/Dialog";
import {BlueBGButton, GreyBorderRedButton, RedBGButton} from "../components/Button";
import {TextField} from "../components/TextField";
import {SortFilterBar} from "../components/SortFilterBar";
import {RadioButtonGroup} from "../components/RadioButtonGroup";
import '../styles/Admin.css';


export default function AdvancedGrid({
                                         displayData,
                                         headerDialogs,
                                         cellCallback,
                                         searchableHeaders = [],
                                         excludeHeader = ['id']
                                     }) {
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
    }, [displayData, searchValues])


    let _displayData = []
    if (!Array.isArray(displayData)) {
        for (let key in displayData) {
            _displayData.push(displayData[key])
        }
        displayData = _displayData
    }
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
    let clickableHeader = []
    return (
        <>
            {
                headerDialogs.map((dialog) => {
                    clickableHeader = clickableHeader.concat(dialog.supportedHeaders)
                    return (
                        <Dialog key={dialog.titleGetter()} title={`Managing ${dialog.titleGetter()}`} size={'m'}
                                open={dialog.open}
                                onClose={() => dialog.setOpen(false)}
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

            <right-pane>
                <div style={{display: 'flex', marginBottom: '10px'}}>
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
                </div>
                <SortFilterBar style={{marginBottom: '20px'}}/>
                <Grid headers={headers} tableData={localDisplayData} onClickHandler={cellCallback}
                      clickableHeader={clickableHeader}/>
            </right-pane>

        </>
    );
}
// <FiSearch className={'button-icon'} style={{marginTop: "40px", marginLeft: "30px"}} size={'40'}/>