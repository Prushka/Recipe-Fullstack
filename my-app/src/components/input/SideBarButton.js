/*
 * Copyright 2022 Dan Lyu.
 */

import React from 'react';
import '../../styles/Sidebar.css';
import {useNavigate} from 'react-router-dom';

export default function SideBarButton({setSideBarOpen, title, icon, path, isSelected, style}) {
    const navigate = useNavigate()
    return (
        <>
            <div style={{...style}} className={`side-bar-button ${isSelected(path) && 'side-bar-button-selected'}`}
                    onClick={() => {
                        setSideBarOpen(false)
                        navigate(path)
                    }}><div style={{marginRight:"6px"}}>{icon}</div>{title}
            </div>
        </>

    );
}

