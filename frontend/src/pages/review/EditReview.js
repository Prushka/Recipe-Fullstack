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
import {snackBarHandleError, userIsAdmin} from "../../util";
import CustomRating from "../../components/input/CustomRating";

export default function EditReview({
                                       review, setEditingReview, onClose = () => {
    }, isManage = true
                                   }) {
    const {enqueueSnackbar} = useSnackbar()
    const [content, setContent] = useState(review.content)
    const [inappropriateReports, setInappropriateReports] = useState(review.inappropriateReportUsers)
    const [selectedApproved, setSelectedApproved] = useState(review.approved.toString())
    const [selectedRating, setSelectedRating] = useState(review.rating)
    const [deleteReviewConfirmationOpen, setDeleteReviewConfirmationOpen] = useState(false)

    const user = useSelector((state) => state.user)

    const route = () => {
        const payload = {
            rating: selectedRating,
            content: content,
            approved: selectedApproved,
            inappropriateReportUsers: inappropriateReports
        }
        return isManage ? ReviewAPI.patch(`/${review._id}`, payload) : ReviewAPI.post(`/${review.reviewedRecipe}`, payload)
    }
    return (
        <div className={'edit__container edit__container__column edit__container__column--1'}>
            <CustomRating rating={selectedRating} setRating={setSelectedRating}
            />
            {isManage && <TextField value={review.reviewedRecipeTitle}
                                    className="edit__input"
                                    textFieldClassName="edit__input"
                                    label={'Reviewed Recipe Name'} disabled={true}/>}

            {(userIsAdmin(user) && isManage) && <>
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

            {(userIsAdmin(user) && isManage) &&
                <TextField value={inappropriateReports} setValue={setInappropriateReports}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Users who reported this review as inappropriate'}/>}

            {/*<RadioButtonGroup className={'edit__radio'}*/}
            {/*                  title={'Rating'}*/}
            {/*                  options={ratings}*/}
            {/*                  selected={selectedRating}*/}
            {/*                  setSelected={(d) => {*/}
            {/*                      setSelectedRating(d)*/}
            {/*                  }*/}
            {/*                  }/>*/}

            {userIsAdmin(user) && <RadioButtonGroup
                title={'Approved'}
                options={["true", "false"]}
                selected={selectedApproved}
                setSelected={(d) => {
                    setSelectedApproved(d)
                }
                }/>}


            {isManage && <>
                <TextField value={review.upVotes}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Upvotes'} disabled={true}/>


                <TextField value={review.downVotes}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Downvotes'} disabled={true}/>
            </>}

            {(userIsAdmin(user) && isManage) && <div className={"edit__grid-container input__box"}>
                <div className={"edit__grid-container__title"}>Voting on this review:</div>
                <AdvancedGrid
                    searchableHeaders={['positivity', 'author', 'authorName']} displayData={review.userVotes}
                    excludeHeader={['_id']}/>
            </div>}


            <BlueBGButton className={'edit__action-button'}
                          onClick={async () => {
                              await route().then(res => {
                                  enqueueSnackbar(`Successfully updated this review`,
                                      {
                                          variant: 'success',
                                          persist: false,
                                      })
                                  onClose()
                              }).catch(e => {
                                  snackBarHandleError(enqueueSnackbar, e)
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
                                        onClose()
                                    }).catch(e => {
                                        snackBarHandleError(enqueueSnackbar, e)
                                    })
                                }}
            />

            <RedBGButton className={'edit__action-button'} onClick={() => {
                setDeleteReviewConfirmationOpen(true)
            }}>DELETE THIS REVIEW</RedBGButton>
        </div>
    )
}