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
import ManageUsers from "./ManageUsers";


export default function Admin({page = 'Manage Users'}) {
    const [userDialogOpen, setUserDialogOpen] = useState(false)
    const [editingUser, setEditingUser] = useState({
        "Username": "None",
        "Permission": "None",
        "id": -1
    })

    function cellCallback(header, value, id, cellId, isHeader) {
        if (header === 'Created By' || header === 'Username') {
            setEditingUser(userData[value])
            setUserDialogOpen(true)
        }
        console.log(`header: [${header}], value: [${value}], id: [${id}], cellId: [${cellId}], isHeader: [${isHeader}]`)
    }

    const [userData, setUserData] = useState({
        "TestUser1": {
            "Username": "TestUser1",
            "Permission": "Guest",
            "id": 1
        },
        "TestUser2": {
            "Username": "TestUser2",
            "Permission": "User",
            "id": 2,
            "avatar": "https://s2.loli.net/2022/02/11/1IV4f92WzuUYKcm.jpg"
        }
        ,
        "TestUser3": {
            "Username": "TestUser3",
            "Permission": "Admin",
            "id": 3,
            "avatar": "https://s2.loli.net/2022/02/10/grldkO4LeDjxmY8.png"
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


    return (
        <>
            <ManageUsers userData={userData} setUserData={setUserData} userDialogOpen={userDialogOpen} setUserDialogOpen={setUserDialogOpen}
            editingUser={editingUser} cellCallback={cellCallback}/>
        </>
    );
}