import * as React from 'react';
import {useState} from "react";
import '../styles/Admin.css';
import ManageUsers from "./ManageUsers";
import {defaultUser, recipes, reviews, users} from "../MockupData";





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

    return <ManageUsers searchableHeaders={["Username", "Permission"]} displayData={userData} setDisplayData={setUserData} clickableHeader={['Username']} userData={userData}
                        setUserData={setUserData} userDialogOpen={userDialogOpen} setUserDialogOpen={setUserDialogOpen}
                        editingUser={editingUser} cellCallback={cellCallback}/>
}

export function AdminManageRecipes() {
    const [userDialogOpen, setUserDialogOpen] = useState(false)
    const [editingUser, setEditingUser] = useState(defaultUser)
    const [userData, setUserData] = useState(users)
    const [recipeData, setRecipeData] = useState(recipes)
    const [reviewData, setReviewData] = useState(reviews)
    function cellCallback(header, value, id, cellId, isHeader) {
        if (header === 'Created By' || header === 'Username') {
            setEditingUser(userData[value])
            setUserDialogOpen(true)
        }
        console.log(`header: [${header}], value: [${value}], id: [${id}], cellId: [${cellId}], isHeader: [${isHeader}]`)
    }

    return <ManageUsers displayData={reviewData} setDisplayData={setReviewData} clickableHeader={['Created By']} userData={userData}
                        setUserData={setUserData} userDialogOpen={userDialogOpen} setUserDialogOpen={setUserDialogOpen}
                        editingUser={editingUser} cellCallback={cellCallback}/>
}