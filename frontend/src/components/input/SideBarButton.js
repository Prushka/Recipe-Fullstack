/*
 * Copyright 2022 Dan Lyu.
 */

import React from 'react';
import '../../styles/Sidebar.css';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserSession, updateUserInfo, UserAPI} from "../../axios/Axios";
import {setUser} from "../../redux/Redux";

export default function SideBarButton({
                                          onClick = () => {
                                          }, setSideBarOpen, title, icon, path, isSelected
                                      }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <>
            <div className={`side-bar__button ${isSelected(path) && 'side-bar__button--selected'}`}
                 onClick={async () => {
                     onClick()
                     if (path) {
                         try{
                             await updateUserInfo(dispatch)
                             setSideBarOpen(false)
                             navigate(path)
                         }catch (e){

                         }
                     }
                 }}>
                <div className={'side-bar__icon'}>{icon}</div>
                {title}
            </div>
        </>

    );
}

