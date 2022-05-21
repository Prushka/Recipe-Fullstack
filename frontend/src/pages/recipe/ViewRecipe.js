/*
 * Copyright 2022 Dan Lyu.
 */

import '../Edit.css';
import React, {useState} from "react";
import {RadioButtonGroup} from "../../components/input/RadioButtonGroup";
import {useDispatch} from "react-redux";
import {GreenBGButton} from "../../components/input/Button";
import {RecipeAPI, ReviewAPI, updateUserInfo, UserAPI} from "../../axios/Axios";
import {useSnackbar} from "notistack";
import {
    diets,
    initialReviewState,
    snackBarHandleError, snackBarHandleSuccess,
    useAsync
} from "../../util";

import {TextField} from "../../components/input/TextField";
import ListInput from "../../components/input/ListInput";
import CustomRating from "../../components/input/CustomRating";
import TextBox from "../../components/input/TextBox";
import AdvancedGrid from "../../components/grid/AdvancedGrid";
import ReviewCard from "../../components/grid/ReviewCard";
import EditReview from "../review/EditReview";
import Dialog from "../../components/dialog/Dialog";

export default function ViewRecipe({
                                       recipe, user,
                                       setRecipe
                                   }) {
    const getNewReview = () => {
        return {...initialReviewState, reviewedRecipe: recipe._id}
    }
    const {enqueueSnackbar} = useSnackbar()
    const dispatch = useDispatch()

    const [editingReview, setEditingReview] = useState(getNewReview())
    const [editReviewDataDialogOpen, setEditReviewDataDialogOpen] = useState(false)
    const isUserFollowingRecipeAuthor = () => {
        return user.following.includes(recipe.author)
    }
    const [isFollowingAuthor, setIsFollowingAuthor] = useState(isUserFollowingRecipeAuthor())

    useAsync(async () => {
            try {
                const response = await RecipeAPI.get(`/${recipe._id}`)
                return response.data
            } catch (e) {
                snackBarHandleError(enqueueSnackbar, e)
            }
        },
        (r) => {
            setRecipe(r)
        }, [editingReview])

    const onClickFollowUnfollow = async () => {
        try {
            if (isFollowingAuthor) {
                await UserAPI.delete(`/follow/${recipe.author}`)
            } else {
                await UserAPI.post(`/follow/${recipe.author}`)
            }
            snackBarHandleSuccess(enqueueSnackbar,
                `Successfully ${isFollowingAuthor ? 'unfollowed' : 'followed'} user ${recipe.authorName}`)
            setIsFollowingAuthor(!isFollowingAuthor)

            await updateUserInfo(dispatch)
        } catch (e) {
            snackBarHandleError(enqueueSnackbar, e)
        }
    }

    const getUserPreviousVoteOnReview = (entity) => {
        const vote = entity.userVotes.filter(vote => {
            return vote.author === user._id
        })
        return (vote && vote.length > 0) ? vote[0] : null
    }

    return (
        <div className={'edit__container'}>
            <Dialog size={'l'} title={``} open={editReviewDataDialogOpen}
                    onClose={() => {
                        setEditReviewDataDialogOpen(false)
                        setEditingReview(getNewReview())
                    }}
                    content={
                        <EditReview
                            onClose={() => {
                                setEditReviewDataDialogOpen(false)
                                setEditingReview(getNewReview())
                            }
                            }
                            isManage={false}
                            review={editingReview}
                            setEditingReview={setEditingReview}
                        />
                    }
                    footer={<>
                    </>
                    }/>
            <div className={'edit__container__column edit__container__column--2'}>
                <div className={'edit__container__thumbnail__container'}>
                    <img src={recipe.thumbnail} alt={'thumbnail'}/>
                </div>

                <CustomRating rating={recipe.averageRating} disabled={true}/>
                <TextField value={recipe.authorName}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Recipe Author'} disabled={true}>
                    <span className={'edit__follow__user__text'}
                          onClick={onClickFollowUnfollow}
                    >{isFollowingAuthor ? "Unfollow" : "Follow"}</span>
                </TextField>
                <TextField value={recipe.category}
                           className="edit__input"
                           textFieldClassName="edit__input"
                           label={'Recipe Category'} disabled={true}/>
                <RadioButtonGroup
                    title={'Diet'}
                    options={diets}
                    selected={recipe.diet}
                    disabled={true}
                />
                <ListInput disabled={true} className={'edit__input'} label={"Recipe Ingredients"}
                           list={recipe.ingredients}/>

                <TextBox content={recipe.instructions} label={'Instructions'}/>

                <ListInput disabled={true} className={'edit__input'} label={"Recipe Tags"} list={recipe.tags}/>

            </div>

            <div className={'edit__container__column edit__container__column--2'}>
                <GreenBGButton className={"full-width"}
                               onClick={() => {
                                   const preReview = recipe.reviews.filter(review => {
                                       return review.author === user._id
                                   })
                                   setEditingReview((preReview && preReview.length > 0) ? preReview[0] : getNewReview())
                                   setEditReviewDataDialogOpen(true)
                               }}
                >Post / Update your review</GreenBGButton>
                <AdvancedGrid
                    excludeHeader={['authorName', 'authorAvatar', '_id', 'approved', 'content', 'reviewedRecipe', 'author', 'userVotes', 'inappropriateReportUsers', 'reviewedRecipeTitle']}
                    searchableHeaders={['rating', 'authorName']}
                    customEntityRenderer={(props) => {
                        return <ReviewCard
                            {...props}
                            userPreVote={getUserPreviousVoteOnReview}
                            onClickVote={async (entity, positivity) => {
                                try {
                                    const preVote = getUserPreviousVoteOnReview(entity)
                                    if (preVote && preVote.positivity.toString() === positivity.toString()) {
                                        positivity = 0
                                    }
                                    await ReviewAPI.post(`/vote/${entity._id}`, {positivity})
                                    snackBarHandleSuccess(enqueueSnackbar, `Successfully ${positivity === 1 ? 'Upvoted' : positivity === 0 ? 'removed your vote' : 'Downvoted'}`)
                                    setEditingReview(getNewReview())
                                } catch (e) {
                                    snackBarHandleError(enqueueSnackbar, e)
                                }
                            }
                            }/>
                    }}
                    customEntityContainerClassName={'flex-wrap'}
                    displayData={recipe.reviews} cellCallback={(e) => {

                }}/>
            </div>
        </div>
    )
}