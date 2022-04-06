/*
 * Copyright 2022 Dan Lyu.
 */

import '../Edit.css';
import React, {useState} from "react";
import {RadioButtonGroup} from "../../components/input/RadioButtonGroup";
import {useSelector} from "react-redux";
import {BlueBGButton, RedBGButton} from "../../components/input/Button";
import {RecipeAPI} from "../../axios/Axios";
import {useSnackbar} from "notistack";
import ConfirmationDialog from "../../components/dialog/ConfirmationDialog";
import {categories, diets, userIsAdmin} from "../../util";
import {Autocomplete, TextField as MuiTextField} from "@mui/material";

import {TextField} from "../../components/input/TextField";
import SingleFileField from "../../components/input/SingleFileField";
import DropdownTextField from "../../components/input/DropdownTextField";

export default function EditRecipe({
                                       recipe, setEditingRecipe, onDelete = () => {
    }
                                   }) {
    console.log(recipe)
    const {enqueueSnackbar} = useSnackbar()
    const [title, setTitle] = useState(recipe.title)
    const [instructions, setInstructions] = useState(recipe.instructions)
    const [selectedApproved, setSelectedApproved] = useState(recipe.approved.toString())
    const [category, setSelectedCategory] = useState(recipe.category)
    const [diet, setSelectedDiet] = useState(recipe.diet)
    const [deleteRecipeConfirmationOpen, setDeleteRecipeConfirmationOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)

    const user = useSelector((state) => state.user)

    return (
        <div className={'edit__container'}>

            <img src={recipe.thumbnail} alt={'thumbnail'}/>

            <SingleFileField className={'edit__input'} title={'Upload Recipe Thumbnail'} file={selectedFile} setFile={setSelectedFile}/>
            <TextField value={title}
                       setValue={setTitle}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Recipe Title'}/>


            <TextField value={instructions}
                       setValue={setInstructions}
                       size={'m'}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Recipe Instructions'}/>

            <DropdownTextField label={'Categories'} value={category} setValue={setSelectedCategory}
            options={categories} className={'edit__input'} textFieldClassName="edit__input"/>

            {userIsAdmin(user) && <>
                <TextField value={recipe.authorName}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Recipe Author'} disabled={true}/>
                <TextField value={recipe._id}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Recipe Id'} disabled={true}/>
            </>}
            <RadioButtonGroup className={'edit__radio'}
                              title={'Diet'}
                              options={diets}
                              selected={diet}
                              setSelected={(d) => {
                                  setSelectedDiet(d)
                              }
                              }/>

            {userIsAdmin && <RadioButtonGroup className={'edit__radio'}
                                              title={'Approved'}
                                              options={["true", "false"]}
                                              selected={selectedApproved}
                                              setSelected={(d) => {
                                                  setSelectedApproved(d)
                                              }
                                              }/>}


            <BlueBGButton className={'edit__action-button'}
                          onClick={async () => {
                              await RecipeAPI.patch(`/${recipe._id}`, {}).then(res => {
                                  enqueueSnackbar(`Successfully updated this recipe`,
                                      {
                                          variant: 'success',
                                          persist: false,
                                      })
                              }).catch(error => {
                                  enqueueSnackbar(`${error.response.data.message}`,
                                      {
                                          variant: 'error',
                                          persist: false,
                                      })
                              })
                          }}>Save</BlueBGButton>

            <ConfirmationDialog open={deleteRecipeConfirmationOpen}
                                setOpen={setDeleteRecipeConfirmationOpen}
                                title={`Are you sure you want to remove this recipe?`}
                                content={"You cannot undo this operation."}
                                onConfirm={async () => {
                                    await RecipeAPI.delete(`/${recipe._id}`).then(res => {
                                        enqueueSnackbar(`Successfully deleted`,
                                            {
                                                variant: 'success',
                                                persist: false,
                                            })
                                        onDelete()
                                    }).catch(error => {
                                        enqueueSnackbar(`${error.response.data.message}`,
                                            {
                                                variant: 'error',
                                                persist: false,
                                            })
                                    })
                                }}
            />

            <RedBGButton className={'edit__action-button'} onClick={() => {
                setDeleteRecipeConfirmationOpen(true)
            }}>DELETE THIS REVIEW</RedBGButton>
        </div>
    )
}