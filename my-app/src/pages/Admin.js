import * as React from 'react';
import Grid from "../components/Grid";
import {useState} from "react";
import Dialog from "../components/Dialog";
import {BlueBGButton, GreyBorderRedButton, RedBGButton} from "../components/Button";


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
            <Dialog title='Managing User' open={testModalOpen} onClose={() => setTestModalOpen(false)}
                content={
                'test'
            }
                bottom={
                <>
                    <div style={{display:"flex"}}>
                        <BlueBGButton>SAVE</BlueBGButton>
                        <RedBGButton minWidth={'300px'}>Delete User</RedBGButton>
                        <GreyBorderRedButton onClick={()=>setTestModalOpen(false)}>Cancel</GreyBorderRedButton>
                    </div>
                </>
            } />
            <Grid tableData={tableData} onClickHandler={test} excludeHeader={["rowId"]}
                  clickableHeader={["Created By"]}/>
        </>
    );
}