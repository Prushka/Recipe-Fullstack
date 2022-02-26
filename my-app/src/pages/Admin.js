/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import {useState} from "react";
import '../styles/Admin.css';
import AdvancedGrid from "./AdvancedGrid";
import {defaultUser, recipes, reviews, users} from "../MockupData";
import {TextField} from "../components/TextField";
import {RadioButtonGroup} from "../components/RadioButtonGroup";
import {BlueBGButton, GreyBorderRedButton, RedBGButton} from "../components/Button";

const clickable = ['Created By', 'Username', 'Recipe Author', 'Rating Author']

class Dialog {
    constructor(data, setData, open, setOpen, editingEntity, setEditingEntity, contentGetter, footerGetter, titleGetter) {
        this.data = data
        this.setData = setData
        this.open = open
        this.setOpen = setOpen
        this.contentGetter = contentGetter
        this.footerGetter = footerGetter
        this.titleGetter = titleGetter
    }
}

function getUserEditingDialog(userData, setUserData, userDialogOpen, setUserDialogOpen,
                              editingUser, setEditingUser) {
    return new Dialog(userData, setUserData, userDialogOpen, setUserDialogOpen,
        editingUser, setEditingUser, () => {
            return (
                <spaced-horizontal-preferred>
                    <TextField defaultValue={editingUser["Username"]} label={'Username'}/>
                    <RadioButtonGroup style={{minWidth: '300px'}} title={'Role/Permission Set'}
                                      options={['Guest', 'User', 'Admin']}
                                      selected={editingUser["Permission"]}/>
                </spaced-horizontal-preferred>
            )
        }, () => {
            return (
                <spaced-horizontal-preferred>
                    <RedBGButton>Delete User</RedBGButton>
                    <div className={'dialog-right-button-group'}>
                        <GreyBorderRedButton
                            onClick={() => setUserDialogOpen(false)}>Cancel</GreyBorderRedButton>
                        <BlueBGButton>Save</BlueBGButton>
                    </div>
                </spaced-horizontal-preferred>
            )
        },
        () => {
            return editingUser["Username"]
        })
}

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

    return <AdvancedGrid
        headerDialogs={[getUserEditingDialog(userData, setUserData, userDialogOpen, setUserDialogOpen,
            editingUser, setEditingUser)]}
        searchableHeaders={["Recipe", "Recipe Author", "Rating", "Rating Author", "Public"]}
        displayData={reviewsData} setDisplayData={setReviewsData}
        clickableHeader={clickable} cellCallback={cellCallback}/>
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
                         displayData={userData} setDisplayData={setUserData} clickableHeader={clickable}
                         headerDialogs={[getUserEditingDialog(userData, setUserData, userDialogOpen, setUserDialogOpen,
                             editingUser, setEditingUser)]} cellCallback={cellCallback}/>
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

    return <AdvancedGrid headerDialogs={[getUserEditingDialog(userData, setUserData, userDialogOpen, setUserDialogOpen,
        editingUser, setEditingUser)]}
                         searchableHeaders={['Recipe Name', 'Category', 'Created By']} displayData={recipeData}
                         setDisplayData={setRecipeData} clickableHeader={clickable} cellCallback={cellCallback}/>
}