/*
 * Copyright 2022 Dan Lyu.
 */

import React from 'react';
import '../../styles/Sidebar.css';
import {useNavigate} from 'react-router-dom';

export default function SideBarButton({setSideBarOpen, title, icon, path, isSelected}) {
    const navigate = useNavigate()
    return (
        <>
            <div className={`side-bar__button ${isSelected(path) && 'side-bar__button--selected'}`}
                    onClick={() => {
                        setSideBarOpen(false)
                        navigate(path)
                    }}><div className={'side-bar__icon'}>{icon}</div>{title}
            </div>
        </>

    );
}

