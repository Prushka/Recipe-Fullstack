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
            <button style={{...style}} className={isSelected(path) && 'selected'}
                    onClick={() => {
                        setSideBarOpen(false)
                        navigate(path)
                    }}>{icon} {title}
            </button>
        </>

    );
}

