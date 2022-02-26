import * as React from 'react';
import Grid from "../components/Grid";
import {useState} from "react";
import Dialog from "../components/Dialog";
import {BlueBGButton, GreyBorderRedButton, RedBGButton} from "../components/Button";
import {TextField} from "../components/TextField";
import {SortFilterBar} from "../components/SortFilterBar";
import {RadioButtonGroup} from "../components/RadioButtonGroup";
import '../styles/Admin.css';
import {FiSearch} from "react-icons/fi";


export default function ManageUsers({
                                        displayData,
                                        userData,
                                        setUserData,
                                        setDisplayData,
                                        editingUser,
                                        setUserDialogOpen,
                                        userDialogOpen,
                                        cellCallback,
                                        clickableHeader,
                                        searchableHeaders = []
                                    }) {

    const [searchValue, setSearchValue] = useState({});
    let _displayData = []
    if (!Array.isArray(displayData)) {
        for (let key in displayData) {
            _displayData.push(displayData[key])
        }
        displayData = _displayData
    }
    const [localDisplayData, setLocalDisplayData] = useState([...displayData]);
    return (
        <>
            <Dialog title={`Managing ${editingUser["Username"]}`} size={'m'} open={userDialogOpen}
                    onClose={() => setUserDialogOpen(false)}
                    content={
                        <spaced-horizontal-preferred>
                            <TextField defaultValue={editingUser["Username"]} label={'Username'}/>
                            <RadioButtonGroup style={{minWidth: '300px'}} title={'Role/Permission Set'}
                                              options={['Guest', 'User', 'Admin']}
                                              selected={editingUser["Permission"]}/>
                        </spaced-horizontal-preferred>
                    }
                    bottom={
                        <>
                            <spaced-horizontal-preferred>
                                <RedBGButton>Delete User</RedBGButton>
                                <div className={'dialog-right-button-group'}>
                                    <GreyBorderRedButton
                                        onClick={() => setUserDialogOpen(false)}>Cancel</GreyBorderRedButton>
                                    <BlueBGButton>Save</BlueBGButton>
                                </div>
                            </spaced-horizontal-preferred>
                        </>
                    }/>
            <div style={{padding: "30px"}}>
                <div style={{display: 'flex', marginBottom: '10px'}}>
                    {
                        searchableHeaders.map((searchHeader) => {
                            return (
                                <TextField value={searchValue[searchHeader]} onChange={(e) => {
                                    setLocalDisplayData(displayData.filter((i) => i[searchHeader].includes(e.target.value)));
                                }} style={{minWidth: "300px"}} label={`Search ${searchHeader}`} key={searchHeader}/>)
                        })
                    }
                </div>
                <SortFilterBar style={{marginBottom: '20px'}}/>
                <Grid tableData={localDisplayData} onClickHandler={cellCallback} excludeHeader={["id"]}
                      clickableHeader={clickableHeader}/>
            </div>

        </>
    );
}
// <FiSearch className={'button-icon'} style={{marginTop: "40px", marginLeft: "30px"}} size={'40'}/>