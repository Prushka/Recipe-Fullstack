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
import {ReviewAPI} from "../../axios/Axios";
import {useSnackbar} from "notistack";
import ConfirmationDialog from "../../components/dialog/ConfirmationDialog";
import {userIsAdmin} from "../../util";

export default function EditReview({
                                       review, setEditingReview, onDelete = () => {
    }
                                   }) {
    const {enqueueSnackbar} = useSnackbar()
    const [content, setContent] = useState(review.content)
    const [inappropriateReports, setInappropriateReports] = useState(review.inappropriateReportUsers)
    const [selectedApproved, setSelectedApproved] = useState(review.approved.toString())
    const [selectedRating, setSelectedRating] = useState(review.rating)
    const [deleteReviewConfirmationOpen, setDeleteReviewConfirmationOpen] = useState(false)

    const user = useSelector((state) => state.user)

    return (
        <div className={'edit__container'}>

            <TextField value={review.reviewedRecipeTitle}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Reviewed Recipe Name'} disabled={true}/>

            {userIsAdmin(user) && <>
                <TextField value={review._id}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Review Id'} disabled={true}/>

                <TextField value={review.reviewedRecipe}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Reviewed Recipe'} disabled={true}/>

                <TextField value={review.author}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Author'} disabled={true}/>
            </>}


            <TextField size={'m'} value={content} setValue={setContent}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Content'}/>

            {userIsAdmin(user) &&
                <TextField value={inappropriateReports} setValue={setInappropriateReports}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Users who reported this review as inappropriate'}/>}

            <RadioButtonGroup className={'edit__radio'}
                              title={'Rating'}
                              options={[-1, 0, 1]}
                              selected={selectedRating}
                              setSelected={(d) => {
                                  setSelectedRating(d)
                              }
                              }/>


            {userIsAdmin(user) && <RadioButtonGroup className={'edit__radio'}
                                              title={'Approved'}
                                              options={["true", "false"]}
                                              selected={selectedApproved}
                                              setSelected={(d) => {
                                                  setSelectedApproved(d)
                                              }
                                              }/>}


            <TextField value={review.upVotes}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Upvotes'} disabled={true}/>


            <TextField value={review.downVotes}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Downvotes'} disabled={true}/>

            {userIsAdmin(user) && <div className={"edit__grid-container input__box"}>
                <div className={"edit__grid-container__title"}>Voting on this review:</div>
                <AdvancedGrid
                    searchableHeaders={['positivity', 'author', 'authorName']} displayData={review.userVotes}
                    excludeHeader={['_id']}/>
            </div>}


            <BlueBGButton className={'edit__action-button'}
                          onClick={async () => {
                              await ReviewAPI.patch(`/${review._id}`, {
                                  rating: selectedRating,
                                  content: content,
                                  approved: selectedApproved,
                                  inappropriateReportUsers: inappropriateReports
                              }).then(res => {
                                  enqueueSnackbar(`Successfully updated this review`,
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

            <ConfirmationDialog open={deleteReviewConfirmationOpen}
                                setOpen={setDeleteReviewConfirmationOpen}
                                title={`Are you sure you want to remove this review?`}
                                content={"You cannot undo this operation."}
                                onConfirm={async () => {
                                    await ReviewAPI.delete(`/${review._id}`).then(res => {
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
                setDeleteReviewConfirmationOpen(true)
            }}>DELETE THIS REVIEW</RedBGButton>
        </div>
    )
}