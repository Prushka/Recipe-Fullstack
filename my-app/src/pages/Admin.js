import * as React from 'react';
import Grid from "../components/Grid";
import {useState} from "react";
import Dialog from "../components/Dialog";
import {BlueBGButton, GreyBorderRedButton, RedBGButton} from "../components/Button";
import {TextField} from "../components/TextField";
import {SortFilterBar} from "../components/SortFilterBar";
import {RadioButtonGroup} from "../components/RadioButtonGroup";


export default function Admin({}) {
    const [testModalOpen, setTestModalOpen] = useState(true)
    const [tableData, setTableData] = useState([
        {
            "Recipe Name": "Water",
            "Category": "Mystery",
            "Last Edit": "122 days ago",
            "Created By": "TestUser2",
            "rowId": 1
        },
        {
            "Recipe Name": "Sushi",
            "Category": "Japanese",
            "Views": 3,
            "Review": 4.2,
            "Steps": 10,
            "Last Edit": "10 days ago",
            "Created By": "TestUser1",
            "rowId": 2
        },
        {
            "Recipe Name": "Apple",
            "Category": "Fruit",
            "Views": 3,
            "Review": 4.2,
            "Created By": "TestUser3",
            "rowId": 3
        }
    ])

    function test(header, value, rowId, cellId, isHeader) {
        if (header === 'Created By') {
            setTestModalOpen(true)
        }
        console.log(`header: [${header}], value: [${value}], rowId: [${rowId}], cellId: [${cellId}], isHeader: [${isHeader}]`)
    }

    return (
        <>
            <Dialog title='Managing User' size={'m'} open={testModalOpen} onClose={() => setTestModalOpen(false)}
                content={
                    <spaced-horizontal-preferred>
                        <TextField placeholder={'User3'} label={'Username'}/>
                        <RadioButtonGroup style={{minWidth:'300px'}} title={'Role/Permission Set'} options={['Guest', 'User', 'Admin']}/>
                    </spaced-horizontal-preferred>
            }
                bottom={
                <>
                    <spaced-horizontal-preferred>
                        <RedBGButton>Delete User</RedBGButton>
                        <div style={{alignSelf: 'end', display: "flex", flexDirection: 'row'}}>
                            <GreyBorderRedButton onClick={()=>setTestModalOpen(false)}>Cancel</GreyBorderRedButton>
                            <BlueBGButton>Save</BlueBGButton>
                        </div>
                    </spaced-horizontal-preferred>
                </>
            } />
            <SortFilterBar/>
            <Grid tableData={tableData} onClickHandler={test} excludeHeader={["rowId"]}
                  clickableHeader={["Created By"]}/>
        </>
    );
}