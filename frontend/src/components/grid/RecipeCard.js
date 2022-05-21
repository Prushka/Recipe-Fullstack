/*
 * Copyright 2022 Dan Lyu.
 */

import './Card.css'
import * as React from 'react';
import {ClickEvent} from "./ClickEvent";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {BlueBGButton, GreenBGButton} from "../input/Button";
import {useSelector} from "react-redux";
import {RecipeAPI} from "../../axios/Axios";
import {useSnackbar} from "notistack";
import {useState} from "react";
import {TiTick} from "react-icons/ti";
import {initialRecipeState, snackBarHandleError} from "../../util";
import EditRecipe from "../../pages/recipe/EditRecipe";
import Dialog from "../dialog/Dialog";
import ViewRecipe from "../../pages/recipe/ViewRecipe";
import {Rating} from "@mui/material";

export default function RecipeCard({
                                       sortValues, setSortValues,
                                       id, values, headers, isHeader = false,
                                       entity,
                                       onClickHandler, clickableHeader = [],
                                       buttonText = "View Recipe", onButtonClick = () => {
    }
                                   }) {
    const user = useSelector((state) => state.user)
    const [isFavorite, setIsFavorite] = useState(user.savedRecipes.includes(entity._id))
    const {enqueueSnackbar} = useSnackbar()

    const saveRecipe = async () => {
        await RecipeAPI.post(`/save/${entity._id}`).then(res => {
            enqueueSnackbar("Saved recipe",
                {
                    variant: 'success',
                    persist: false,
                })
            setIsFavorite(true)
        }).catch(e => {
            snackBarHandleError(enqueueSnackbar, e)
        })
    }
    const removeSavedRecipe = async () => {
        await RecipeAPI.delete(`/save/${entity._id}`).then(res => {
            enqueueSnackbar("Removed saved recipe",
                {
                    variant: 'success',
                    persist: false,
                })
            setIsFavorite(false)
        }).catch(e => {
            snackBarHandleError(enqueueSnackbar, e)
        })
    }


    const clickEvent = new ClickEvent(null, null, id, null, isHeader, entity)
    return (
        <div onClick={() => onClickHandler(clickEvent)} key={id}
             className={'custom__card recipe__card'}>
            <div className={'recipe__card__img__container'}>

                <img src={entity.thumbnail} alt={entity}/>
            </div>

            <div className={'recipe__card__information'}>
                <div className={'recipe__card__title'}>
                    <span>{entity.title}</span>
                    {entity.approved && <TiTick className={'recipe__card__tick'} size={20}/>}
                </div>

                <div className={'recipe__card__category'}>
                    Category: {entity.category}
                </div>
                <div className={'recipe__card__author'}>
                    Created By: {entity.authorName}
                </div>

                <div className={'recipe__card__instructions'}>
                    {entity.instructions}
                </div>
            </div>

            <div onClick={(e) => {
                e.stopPropagation()
            }} className={'recipe__card__right__pane'}>
                {!isFavorite ?
                    <AiOutlineHeart onClick={saveRecipe} size={25} className={'recipe__card__favorite'}/> :
                    <AiFillHeart onClick={removeSavedRecipe} size={25} className={'recipe__card__favorite'}/>}
                <Rating className={'recipe__card__rating'} name="read-only" precision={0.1} value={entity.averageRating} readOnly />
                {buttonText.toLowerCase().includes('edit') ? <GreenBGButton
                    onClick={() => onButtonClick(clickEvent)}
                    className={'recipe__card__view__button'}>{buttonText}</GreenBGButton> : <BlueBGButton
                    onClick={() => onButtonClick(clickEvent)}
                    className={'recipe__card__view__button'}>{buttonText}</BlueBGButton>}
            </div>
        </div>
    );
}