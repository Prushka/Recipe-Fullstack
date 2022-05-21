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
import {categories, diets, snackBarHandleError, uploadFile, userIsAdmin} from "../../util";

import {TextField} from "../../components/input/TextField";
import SingleFileField from "../../components/input/SingleFileField";
import DropdownTextField from "../../components/input/DropdownTextField";
import ListInput from "../../components/input/ListInput";

export default function EditRecipe({
                                       recipe, setEditingRecipe, onClose = () => {
    }, isNew = false
                                   }) {
    const {enqueueSnackbar} = useSnackbar()
    const [title, setTitle] = useState(recipe.title)
    const [instructions, setInstructions] = useState(recipe.instructions)
    const [selectedApproved, setSelectedApproved] = useState(recipe.approved.toString())
    const [category, setSelectedCategory] = useState(recipe.category)
    const [diet, setSelectedDiet] = useState(recipe.diet)
    const [deleteRecipeConfirmationOpen, setDeleteRecipeConfirmationOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [ingredients, setIngredients] = useState(recipe.ingredients)
    const [tags, setTags] = useState(recipe.tags)

    const user = useSelector((state) => state.user)

    return (
        <div className={'edit__container edit__container__column edit__container__column--1'}>
            <div className={'edit__container__thumbnail__container'}>
                <img src={recipe.thumbnail} alt={'thumbnail'}/>
            </div>

            <SingleFileField className={'edit__input'} title={'Upload Recipe Thumbnail'} file={selectedFile}
                             setFile={setSelectedFile}/>
            <TextField value={title}
                       setValue={setTitle}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Recipe Title'}/>


            <DropdownTextField label={'Categories'} value={category} setValue={setSelectedCategory}
                               options={categories} className={'edit__input'} textFieldClassName="edit__input"/>

            <RadioButtonGroup
                              title={'Diet'}
                              options={diets}
                              selected={diet}
                              setSelected={(d) => {
                                  setSelectedDiet(d)
                              }
                              }/>


            <TextField value={instructions}
                       setValue={setInstructions}
                       size={'m'}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Recipe Instructions'}/>

            <ListInput className={'edit__input'} label={"Recipe Ingredients"} list={ingredients}
                       setList={setIngredients}/>
            <ListInput className={'edit__input'} label={"Recipe Tags"} list={tags} setList={setTags}/>

            {(userIsAdmin(user) && !isNew) && <>
                <TextField value={recipe.authorName}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Recipe Author'} disabled={true}/>
                <TextField value={recipe._id}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Recipe Id'} disabled={true}/>
            </>}

            {userIsAdmin(user) && <RadioButtonGroup
                                                    title={'Approved'}
                                                    options={["true", "false"]}
                                                    selected={selectedApproved}
                                                    setSelected={(d) => {
                                                        setSelectedApproved(d)
                                                    }
                                                    }/>}


            <BlueBGButton className={'edit__action-button'}
                          onClick={async () => {
                              let payload = {
                                  title: title,
                                  category: category,
                                  diet: diet,
                                  instructions: instructions,
                                  ingredients: ingredients,
                                  tags: tags
                              }
                              const thumbnail = await uploadFile(selectedFile, enqueueSnackbar)
                              if (thumbnail) {
                                  payload = {...payload, thumbnail}
                              }
                              if (userIsAdmin(user)) {
                                  payload = {...payload, approved: selectedApproved}
                              }
                              const route = () => isNew ? RecipeAPI.post(``, payload) : RecipeAPI.patch(`/${recipe._id}`, payload)
                              await route().then(res => {
                                  setEditingRecipe(res.data)
                                  enqueueSnackbar(`Successfully ${isNew ? 'created' : 'updated'} this recipe`,
                                      {
                                          variant: 'success',
                                          persist: false,
                                      })
                                  isNew && onClose()
                              }).catch(e => {
                                  snackBarHandleError(enqueueSnackbar, e)
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
                                        onClose()
                                    }).catch(e => {
                                        snackBarHandleError(enqueueSnackbar, e)
                                    })
                                }}
            />

            {!isNew && <RedBGButton className={'edit__action-button'} onClick={() => {
                setDeleteRecipeConfirmationOpen(true)
            }}>DELETE THIS RECIPE</RedBGButton>}
        </div>
    )
}