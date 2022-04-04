/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import {useEffect, useState} from 'react';
import '../styles/Admin.css';
import AdvancedGrid from "../components/grid/AdvancedGrid";
import {
    defaultReview,
    defaultUser,
    findRecipesByRecipeName,
    findUserByName,
    recipes,
    reports,
    reviews,
    users
} from "../MockupData";
import {TextField} from "../components/input/TextField";
import {RadioButtonGroup} from "../components/input/RadioButtonGroup";
import {BlueBGButton, RedBGButton} from "../components/input/Button";
import {addSnackbar, SnackbarProperties} from "../components/snack/Snackbar";
import {useSelector} from "react-redux";
import {UserAPI} from "../axios/Axios";
import {useSnackbar} from "notistack";
import Profile from "./profile/Profile";
import {userInitialState} from "../redux/Redux";
import Dialog from "../components/dialog/Dialog";
import {useAsync} from "../util";

const userHeaders = ['Created By', 'Username', 'Recipe Author', 'Comment Author']
const recipeHeaders = ['Recipe Name', 'Recipe']

class DialogWrapper {
    constructor(uid, data, setData, editingEntity, setEditingEntity, contentGetter, footerGetter, titleGetter,
                supportedHeaders, size = 'm') {
        this.uid = uid
        this.data = data
        this.setData = setData
        this.editingEntity = editingEntity
        this.setEditingEntity = setEditingEntity
        this.contentGetter = contentGetter
        this.footerGetter = footerGetter
        this.titleGetter = titleGetter
        this.supportedHeaders = supportedHeaders
        this.size = size
        this.callbacks = []
    }

    addCallback(callback) {
        this.callbacks.push(callback)
    }
}

function getReviewsViewDialog(data, setData,
                              editingEntity, setEditingEntity, supportedHeaders) {
    const dialog = new DialogWrapper("ReviewsView", data, setData,
        editingEntity, setEditingEntity, () => {
            return (
                <>
                    <AdvancedGrid
                        searchableHeaders={['Recipe Author', 'Comment Author']} displayData={
                        data.filter((i) => {
                            return i["Recipe"] === editingEntity["Recipe Name"]
                        })
                    }
                        cellCallback={cellCallback}/>
                </>
            )
        }, () => {
            return (<></>)
        },
        () => {
            return `Reviews on ${editingEntity["Recipe Name"]}`
        }, supportedHeaders, 'l')
    dialog.addCallback((e) => {
        setEditingEntity(e.entity)
    })
    return dialog
}

function getRecipesViewDialog(data, setData,
                              editingEntity, setEditingEntity, supportedHeaders) {
    const dialog = new DialogWrapper("RecipesView", data, setData,
        editingEntity, setEditingEntity, () => {
            return (
                <>
                    <AdvancedGrid
                        searchableHeaders={['Recipe Name', 'Category']} displayData={
                        data.filter((i) => {
                            return i["Created By"] === editingEntity["Username"]
                        })
                    }
                        cellCallback={cellCallback}/>
                </>
            )
        }, () => {
            return (<></>)
        },
        () => {
            return `${editingEntity["Username"]}'s uploaded recipes`
        }, supportedHeaders, 'l')
    dialog.addCallback((e) => {
        setEditingEntity(e.entity)
    })
    return dialog
}

function getReportEditingDialog(data, setData,
                                editingEntity, setEditingEntity, supportedHeaders) {
    const dialog = new DialogWrapper("Report", data, setData,
        editingEntity, setEditingEntity, () => {
            return (
                <>
                    <AdvancedGrid
                        searchableHeaders={['Report', 'Report Reason']} displayData={data}
                        setDisplayData={setData} cellCallback={cellCallback}/>
                </>
            )
        }, () => {
            return (<></>)
        },
        () => {
            return `Reports on ${editingEntity["Recipe Author"]}'s review`
        }, supportedHeaders, 'l')
    dialog.addCallback((e) => {
        setEditingEntity(e.entity)
    })
    return dialog
}

function getRecipeEditingDialog(data, setData,
                                editingEntity, setEditingEntity, supportedHeaders, onSave) {
    return new DialogWrapper("Recipe", data, setData,
        editingEntity, setEditingEntity, () => {
            return (
                <>
                    <TextField defaultValue={editingEntity["Recipe Name"]} label={'Recipe Name'}/>
                    <TextField defaultValue={editingEntity["Category"]} label={'Category'}/>
                    <TextField defaultValue={editingEntity["Reviews"]} label={'Reviews'}/>
                </>
            )
        }, () => {
            return (
                <spaced-horizontal-preferred>
                    <RedBGButton>Delete Recipe</RedBGButton>
                    <div className={'dialog-right-button-group'}>
                        <BlueBGButton onClick={onSave}>Save</BlueBGButton>
                    </div>
                </spaced-horizontal-preferred>
            )
        },
        () => {
            return `Managing ${editingEntity["Recipe Name"]}`
        }, supportedHeaders)
}

function getUserEditingDialog(data, setData,
                              editingEntity, setEditingEntity, supportedHeaders) {

    const dialog = new DialogWrapper("User", data, setData,
        editingEntity, setEditingEntity, () => {
            return (
                <>
                    <TextField defaultValue={editingEntity["Username"]} label={'Username'}/>
                    <TextField defaultValue={editingEntity["Email"]} label={'Email'}/>
                    <TextField defaultValue={editingEntity["Avatar"]} label={'Avatar'}/>
                    <RadioButtonGroup title={'Role/Permission Set'}
                                      options={['User', 'Admin']}
                                      selected={editingEntity["Permission"]}/>
                </>
            )
        }, () => {
            return (
                <spaced-horizontal-preferred>
                    <RedBGButton>Delete User</RedBGButton>
                    <div className={'dialog-right-button-group'}>
                        <BlueBGButton onClick={() => {
                        }}>Save</BlueBGButton>
                    </div>
                </spaced-horizontal-preferred>
            )
        },
        () => {
            return `Managing ${editingEntity["Username"]}`
        }, supportedHeaders)
    dialog.addCallback((e) => {
        if (supportedHeaders.includes(e.header)) {
            setEditingEntity(findUserByName(e.value))
        }
    })
    return dialog
}

function cellCallback(e) {
    console.log(`header: [${e.header}], value: [${e.value}], id: [${e.id}], cellId: [${e.cellId}], isHeader: [${e.isHeader}]]`)
    console.log(e.entity)
}

export function AdminManageReviews() {
    const [editingUser, setEditingUser] = useState(defaultUser)
    const [editingReview, setEditingReview] = useState(defaultReview)
    const [editingRecipe, setEditingRecipe] = useState(defaultReview)
    const [userData, setUserData] = useState(users)
    const [reviewsData, setReviewsData] = useState(reviews)
    const [reportData, setReportData] = useState(reports)
    const [recipeData, setRecipeData] = useState(recipes)
    const recipeEditingDialog = getRecipeEditingDialog(recipeData, setRecipeData,
        editingRecipe, setEditingRecipe, recipeHeaders, () => {
            addSnackbar(new SnackbarProperties({
                text: "Saved (frontend demo)", timeout: 5000, type: "success", position: "bottom-left"
            }))
        })
    recipeEditingDialog.addCallback((e) => {
        recipeEditingDialog.setEditingEntity(findRecipesByRecipeName(e.value))
    })
    return <AdvancedGrid
        headerDialogs={[getUserEditingDialog(userData, setUserData,
            editingUser, setEditingUser, userHeaders),
            getReportEditingDialog(reportData, setReportData,
                editingReview, setEditingReview, ["Report Count"]),
            recipeEditingDialog]}
        searchableHeaders={["Recipe", "Recipe Author", "Rating", "Comment Author", "Public"]}
        displayData={reviewsData} setDisplayData={setReviewsData}
        cellCallback={cellCallback}/>
}


export function AdminManageUsers() {
    const user = useSelector((state) => state.user)
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const [userData, setUserData] = useState([])
    const [editUserDialogOpen, setEditUserDialogOpen] = useState(false)

    useAsync(async () => {
        try {
            const response = await UserAPI.get(`/admin/all`, {})
            return response.data
        } catch (e) {
            enqueueSnackbar(e.response.data.message,
                {
                    variant: 'error',
                    persist: false,
                })
        }
    }, (r) => {
        setUserData(r)
    })
    const [editingUser, setEditingUser] = useState(userInitialState)

    return <>
        <Dialog size={'l'} title={`Editing ${editingUser.name}`} open={editUserDialogOpen}
                onClose={() => setEditUserDialogOpen(false)}
                content={
                    <Profile user={editingUser}/>
                }
                footer={<>
                </>
                }/>
        <AdvancedGrid searchableHeaders={["name", "email", "role", "_id"]}
                      displayData={userData} setDisplayData={setUserData}
                      excludeHeader={["followers", "following", "__v"]}
                      cellCallback={(e) => {
                          setEditingUser(e.entity)
                          setEditUserDialogOpen(true)
                      }
                      }/>
    </>
}

export function AdminManageRecipes() {

    const [editingUser, setEditingUser] = useState(defaultUser)
    const [editingRecipe, setEditingRecipe] = useState(defaultUser)
    const [userData, setUserData] = useState(users)
    const [recipeData, setRecipeData] = useState(recipes)
    const [editingReview, setEditingReview] = useState(defaultReview)
    const [reviewsData, setReviewsData] = useState(reviews)
    const recipeEditingDialog = getRecipeEditingDialog(recipeData, setRecipeData, editingRecipe, setEditingRecipe, recipeHeaders)
    recipeEditingDialog.addCallback((e) => {
        recipeEditingDialog.setEditingEntity(e.entity)
    })
    return <AdvancedGrid
        headerDialogs={[getUserEditingDialog(userData, setUserData,
            editingUser, setEditingUser, userHeaders),
            recipeEditingDialog,
            getReviewsViewDialog(reviewsData, setReviewsData, editingReview, setEditingReview,
                ["Reviews"])]}
        searchableHeaders={['Recipe Name', 'Category', 'Created By']} displayData={recipeData}
        setDisplayData={setRecipeData} cellCallback={cellCallback}/>
}