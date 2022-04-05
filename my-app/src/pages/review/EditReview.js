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

export default function EditReview({review, setEditingReview}) {

    console.log(review)
    const [content, setContent] = useState(review.content)
    const [inappropriateReports, setInappropriateReports] = useState(review.inappropriateReportUsers)
    const [selectedApproved, setSelectedApproved] = useState(review.approved.toString())
    const [selectedRating, setSelectedRating] = useState(review.rating)
    const user = useSelector((state) => state.user)
    return (
        <div className={'edit__container'}>

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

            <TextField value={content} setValue={setContent}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Content'}/>

            <TextField value={inappropriateReports} setValue={setInappropriateReports}
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Users who reported this review as inappropriate'}/>
            <RadioButtonGroup className={'edit__radio'}
                              title={'Rating'}
                              options={[-1, 0, 1]}
                              selected={selectedRating}
                              setSelected={(d) => {
                                  setSelectedRating(d)
                              }
                              }/>

            {user.role > 0 ? <RadioButtonGroup className={'edit__radio'}
                                               title={'Approved'}
                                               options={["true", "false"]}
                                               selected={selectedApproved}
                                               setSelected={(d) => {
                                                   setSelectedApproved(d)
                                               }
                                               }/> : <></>}

            <div className={"edit__grid-container input__box"}>
                <div className={"edit__grid-container__title"}>Voting on this review:</div>
                <AdvancedGrid
                    searchableHeaders={['positivity','author']} displayData={review.userVotes}
                    excludeHeader={['_id']}/>
            </div>

            <BlueBGButton className={'edit__action-button'}
                          onClick={async () => {

                          }}>Save</BlueBGButton>

            <RedBGButton className={'edit__action-button'} onClick={() => {

            }}>DELETE THIS REVIEW</RedBGButton>
        </div>
    )
}