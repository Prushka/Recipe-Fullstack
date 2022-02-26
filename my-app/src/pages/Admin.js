import * as React from 'react';
import {useState} from "react";
import '../styles/Admin.css';
import ManageUsers from "./ManageUsers";
import {defaultUser, recipes, users} from "../mockupData";





export function AdminManageUsers() {
    const [userDialogOpen, setUserDialogOpen] = useState(false)
    const [editingUser, setEditingUser] = useState(defaultUser)
    const [userData, setUserData] = useState(users)
    function cellCallback(header, value, id, cellId, isHeader) {
        if (header === 'Created By' || header === 'Username') {
            setEditingUser(userData[value])
            setUserDialogOpen(true)
        }
        console.log(`header: [${header}], value: [${value}], id: [${id}], cellId: [${cellId}], isHeader: [${isHeader}]`)
    }

    return <ManageUsers displayData={userData} clickableHeader={['Username']} userData={userData}
                        setUserData={setUserData} userDialogOpen={userDialogOpen} setUserDialogOpen={setUserDialogOpen}
                        editingUser={editingUser} cellCallback={cellCallback}/>
}

export function AdminManageRecipes() {
    const [userDialogOpen, setUserDialogOpen] = useState(false)
    const [editingUser, setEditingUser] = useState(defaultUser)
    const [userData, setUserData] = useState(users)
    const [recipeData, setRecipeData] = useState(recipes)
    function cellCallback(header, value, id, cellId, isHeader) {
        if (header === 'Created By' || header === 'Username') {
            setEditingUser(userData[value])
            setUserDialogOpen(true)
        }
        console.log(`header: [${header}], value: [${value}], id: [${id}], cellId: [${cellId}], isHeader: [${isHeader}]`)
    }

    return <ManageUsers displayData={recipeData} clickableHeader={['Created By']} userData={userData}
                        setUserData={setUserData} userDialogOpen={userDialogOpen} setUserDialogOpen={setUserDialogOpen}
                        editingUser={editingUser} cellCallback={cellCallback}/>
}