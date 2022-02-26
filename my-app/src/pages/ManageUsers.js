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


export default function ManageUsers({displayData, userData, setUserData, editingUser, setUserDialogOpen, userDialogOpen, cellCallback,
                                    clickableHeader}) {


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
            <div style={{padding:"30px"}}>
                <div style={{display:'flex', marginBottom:'10px'}}>
                    <TextField style={{minWidth: "300px"}} label={'Search Recipe Name'}/>
                    <FiSearch className={'button-icon'} style={{marginTop: "40px", marginLeft:"30px"}} size={'40'}/>
                </div>
                <SortFilterBar style={{marginBottom:'20px'}}/>
                <Grid tableData={displayData} onClickHandler={cellCallback} excludeHeader={["id"]}
                      clickableHeader={clickableHeader}/>
            </div>

        </>
    );
}