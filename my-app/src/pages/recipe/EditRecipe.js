/*
 * Copyright 2022 Dan Lyu.
 */

import '../Edit.css';
import {TextField} from "../../components/input/TextField";
import React, {useState} from "react";
import {RadioButtonGroup} from "../../components/input/RadioButtonGroup";
import {useSelector} from "react-redux";
import {BlueBGButton, RedBGButton} from "../../components/input/Button";
import AdvancedGrid from "../../components/grid/AdvancedGrid";
import {RecipeAPI} from "../../axios/Axios";
import {useSnackbar} from "notistack";
import ConfirmationDialog from "../../components/dialog/ConfirmationDialog";
import {roles as Role} from "../../util";

export default function EditRecipe({
                                       recipe, setEditingRecipe, onDelete = () => {
    }
                                   }) {
    const {enqueueSnackbar} = useSnackbar()
    const [content, setContent] = useState(recipe.content)
    const [inappropriateReports, setInappropriateReports] = useState(recipe.inappropriateReportUsers)
    const [selectedApproved, setSelectedApproved] = useState(recipe.approved.toString())
    const [selectedRating, setSelectedRating] = useState(recipe.rating)
    const [deleteRecipeConfirmationOpen, setDeleteRecipeConfirmationOpen] = useState(false)

    const user = useSelector((state) => state.user)
    const userIsAdmin = user.role > Role.User

    return (
        <div className={'edit__container'}>

            <TextField value={recipe.recipeedRecipeTitle}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Recipeed Recipe Name'} disabled={true}/>

            {userIsAdmin && <>
                <TextField value={recipe._id}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Recipe Id'} disabled={true}/>

                <TextField value={recipe.recipeedRecipe}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Recipeed Recipe'} disabled={true}/>

                <TextField value={recipe.author}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Author'} disabled={true}/>
            </>}


            <TextField size={'m'} value={content} setValue={setContent}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Content'}/>

            {userIsAdmin &&
                <TextField value={inappropriateReports} setValue={setInappropriateReports}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Users who reported this recipe as inappropriate'}/>}

            <RadioButtonGroup className={'edit__radio'}
                              title={'Rating'}
                              options={[-1, 0, 1]}
                              selected={selectedRating}
                              setSelected={(d) => {
                                  setSelectedRating(d)
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


            <TextField value={recipe.upVotes}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Upvotes'} disabled={true}/>


            <TextField value={recipe.downVotes}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Downvotes'} disabled={true}/>

            {userIsAdmin && <div className={"edit__grid-container input__box"}>
                <div className={"edit__grid-container__title"}>Voting on this recipe:</div>
                <AdvancedGrid
                    searchableHeaders={['positivity', 'author', 'authorName']} displayData={recipe.userVotes}
                    excludeHeader={['_id']}/>
            </div>}


            <BlueBGButton className={'edit__action-button'}
                          onClick={async () => {
                              await RecipeAPI.patch(`/${recipe._id}`, {
                                  rating: selectedRating,
                                  content: content,
                                  approved: selectedApproved,
                                  inappropriateReportUsers: inappropriateReports
                              }).then(res => {
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