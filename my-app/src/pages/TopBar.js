import React from 'react';
import '../styles/Sidebar.css';
import {FaBars} from "react-icons/fa";

export default function TopBar({sideBarOpen, setSideBarOpen}) {

    return (
        <div className={'top-bar'}>
            <FaBars className={'button-icon'} size={'20'} onClick={()=>setSideBarOpen(!sideBarOpen)}/>
        </div>
    );
}