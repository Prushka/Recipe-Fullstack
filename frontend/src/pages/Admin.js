/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import {useState} from 'react';
import '../styles/Admin.css';
import AdvancedGrid from "../components/grid/AdvancedGrid";
import {
    defaultUser,
    findUserByName,
} from "../MockupData";
import {TextField} from "../components/input/TextField";
import {RadioButtonGroup} from "../components/input/RadioButtonGroup";
import {BlueBGButton, RedBGButton} from "../components/input/Button";
import {useSelector} from "react-redux";
import {RecipeAPI, ReviewAPI, UserAPI} from "../axios/Axios";
import {useSnackbar} from "notistack";
import Profile from "./profile/Profile";
import {userInitialState} from "../redux/Redux";
import Dialog from "../components/dialog/Dialog";
import {initialReviewState, snackBarHandleError, useAsync, userIsAdmin} from "../util";
import EditReview from "./review/EditReview";

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

export function ManageReviews() {
    const user = useSelector((state) => state.user)
    const {enqueueSnackbar} = useSnackbar()
    const [editReviewDataDialogOpen, setEditReviewDataDialogOpen] = useState(false)

    const [editingReview, setEditingReview] = useState(initialReviewState)
    const [reviewData, setReviewData] = useState([])

    useAsync(async () => {
        try {
            const response = await ReviewAPI.get(
                userIsAdmin(user) ? "/admin/all" : "")
            return response.data
        } catch (e) {
            snackBarHandleError(enqueueSnackbar, e)
        }
    }, (r) => {
        setReviewData(r)
    }, [editingReview])

    return <>
        <Dialog size={'l'} title={`Editing Review`} open={editReviewDataDialogOpen}
                onClose={() => {
                    setEditReviewDataDialogOpen(false)
                    setEditingReview(initialReviewState)
                }}
                content={
                    <EditReview
                        onClose={() => {
                            setEditReviewDataDialogOpen(false)
                            setEditingReview(initialReviewState)
                        }
                        }
                        review={editingReview}
                        setEditingReview={setEditingReview}
                    />
                }
                footer={<>
                </>
                }/>
        <AdvancedGrid
            searchableHeaders=
                {["authorName", "reviewedRecipeTitle", "rating", "content", "upVotes", "downVotes"]}
            displayData={reviewData}
            excludeHeader={['__v']}
            cellCallback={(e) => {
                setEditingReview(e.entity)
                setEditReviewDataDialogOpen(true)
            }
            }/>
    </>
}


export function AdminManageUsers() {
    const {enqueueSnackbar} = useSnackbar()
    const [userData, setUserData] = useState([])
    const [editUserDialogOpen, setEditUserDialogOpen] = useState(false)
    const [editingUser, setEditingUser] = useState(userInitialState)

    useAsync(async () => {
        try {
            const response = await UserAPI.get(`/admin/all`, {})
            return response.data
        } catch (e) {
            snackBarHandleError(enqueueSnackbar, e)
        }
    }, (r) => {
        setUserData(r)
    }, [editingUser])
    return <>
        <Dialog size={'l'} title={`Editing ${editingUser.name}`} open={editUserDialogOpen}
                onClose={() => {
                    setEditUserDialogOpen(false)
                    setEditingUser(userInitialState)
                }}
                content={
                    <Profile
                        onClose={() => {
                            setEditUserDialogOpen(false)
                            setEditingUser(userInitialState)
                        }
                        }
                        user={editingUser} setEditingUser={setEditingUser}/>
                }
                footer={<>
                </>
                }/>
        <AdvancedGrid searchableHeaders={["name", "email", "role", "_id"]}
                      displayData={userData}
                      excludeHeader={["__v"]}
                      cellCallback={(e) => {
                          setEditingUser(e.entity)
                          setEditUserDialogOpen(true)
                      }
                      }/>
    </>
}

export function AdminManageRecipes() {

    const {enqueueSnackbar} = useSnackbar()
    const [editRecipeDataDialogOpen, setEditRecipeDataDialogOpen] = useState(false)
    const [editingRecipe, setEditingRecipe] = useState(defaultUser)
    const [recipeData, setRecipeData] = useState([])

    useAsync(async () => {
        try {
            const response = await RecipeAPI.get(``, {})
            return response.data
        } catch (e) {
            snackBarHandleError(enqueueSnackbar, e)
        }
    }, (r) => {
        setRecipeData(r)
    }, [editingRecipe])

    return <AdvancedGrid excludeHeader={["__v"]}
                         searchableHeaders={['_id', 'title', 'category', 'instructions', 'ingredients', 'author', 'authorName', 'tags']}
                         displayData={recipeData} cellCallback={cellCallback}/>
}