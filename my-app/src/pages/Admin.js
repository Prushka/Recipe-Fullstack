import * as React from 'react';
import {useState} from "react";
import '../styles/Admin.css';
import AdvancedGrid from "./AdvancedGrid";
import {defaultUser, recipes, reviews, users} from "../MockupData";

const clickable = ['Created By', 'Username', 'Recipe Author', 'Rating Author']

export function AdminReviews() {
    const [userDialogOpen, setUserDialogOpen] = useState(false)
    const [editingUser, setEditingUser] = useState(defaultUser)
    const [userData, setUserData] = useState(users)
    const [reviewsData, setReviewsData] = useState(reviews)
    function cellCallback(header, value, id, cellId, isHeader) {
        if (header === 'Created By' || header === 'Username' || header === 'Recipe Author' || header === 'Rating Author') {
            setEditingUser(userData[value])
            setUserDialogOpen(true)
        }
        console.log(`header: [${header}], value: [${value}], id: [${id}], cellId: [${cellId}], isHeader: [${isHeader}]`)
    }

    return <AdvancedGrid searchableHeaders={["Recipe", "Recipe Author", "Rating", "Rating Author"]}
                         displayData={reviewsData} setDisplayData={setReviewsData} clickableHeader={clickable} userData={userData}
                         setUserData={setUserData} userDialogOpen={userDialogOpen} setUserDialogOpen={setUserDialogOpen}
                         editingUser={editingUser} cellCallback={cellCallback}/>
}


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

    return <AdvancedGrid searchableHeaders={["Username", "Permission", "Email", "Uploaded Recipes"]}
                         displayData={userData} setDisplayData={setUserData} clickableHeader={clickable} userData={userData}
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

    return <AdvancedGrid searchableHeaders={['Recipe Name', 'Category', 'Created By']} displayData={recipeData}
                         setDisplayData={setRecipeData} clickableHeader={clickable} userData={userData}
                         setUserData={setUserData} userDialogOpen={userDialogOpen} setUserDialogOpen={setUserDialogOpen}
                         editingUser={editingUser} cellCallback={cellCallback}/>
}