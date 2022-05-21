import React from 'react';
import '../styles/Sidebar.css';
import {FaBars} from "react-icons/fa";

export default function TopBar({sideBarOpen, setSideBarOpen}) {

    return (
        <div className={'top-bar'}>
            <div className={'button-icon top-bar-nav-icon'} onClick={() => setSideBarOpen(!sideBarOpen)}
            ><FaBars size={'20'}/></div>

        </div>
    );
}