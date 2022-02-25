import * as React from 'react';
import Grid from "../components/Grid";
import {useState} from "react";


export default function Admin({}) {
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
        }
    ])

    return (
        <>
            <Grid tableData={tableData} />
        </>
    );
}