import * as React from 'react';
import Grid from "../components/Grid";
import {useState} from "react";
import Dialog from "../components/Dialog";
import {BlueBGButton, GreyBorderRedButton, RedBGButton} from "../components/Button";
import {TextField} from "../components/TextField";
import {SortFilterBar} from "../components/SortFilterBar";
import {RadioButtonGroup} from "../components/RadioButtonGroup";
import '../styles/Admin.css';
import {FiSearch} from "react-icons/all";


export default function ManageUsers({}) {
    const [userDialogOpen, setUserDialogOpen] = useState(false)
    const [editingUser, setEditingUser] = useState({
        "Username": "None",
        "Permission": "None",
        "id": -1
    })
    const [userData, setUserData] = useState({
        "TestUser1": {
            "Username": "TestUser1",
            "Permission": "Guest",
            "id": 1
        },
        "TestUser2": {
            "Username":
                "TestUser2",
            "Permission":
                "User",
            "id": 2
        }
        ,
        "TestUser3": {
            "Username":
                "TestUser3",
            "Permission":
                "Admin",
            "id": 3
        }
    })
    const [recipeData, setRecipeData] = useState([
        {
            "Recipe Name": "Water",
            "Category": "Mystery",
            "Last Edit": "122 days ago",
            "Created By": "TestUser2",
            "id": 1
        },
        {
            "Recipe Name": "Sushi",
            "Category": "Japanese",
            "Views": 3,
            "Review": 4.2,
            "Steps": 10,
            "Last Edit": "10 days ago",
            "Created By": "TestUser1",
            "id": 2
        },
        {
            "Recipe Name": "Apple",
            "Category": "Fruit",
            "Views": 3,
            "Review": 4.2,
            "Created By": "TestUser3",
            "id": 3
        }
    ])

    function test(header, value, id, cellId, isHeader) {
        if (header === 'Created By') {
            setEditingUser(userData[value])
            setUserDialogOpen(true)
        }
        console.log(`header: [${header}], value: [${value}], id: [${id}], cellId: [${cellId}], isHeader: [${isHeader}]`)
    }

    return (
        <>
            <Dialog title={`Managing ${editingUser}`} size={'m'} open={userDialogOpen}
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
                <Grid tableData={recipeData} onClickHandler={test} excludeHeader={["id"]}
                      clickableHeader={["Created By"]}/>
            </div>

        </>
    );
}