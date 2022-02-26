import food from '../resources/food.jpg';
import {CgProfile, CgSearch, CgHomeAlt, CgHeart, CgPen, CgLogOut} from 'react-icons/cg'
import React, {useState} from 'react';
import '../styles/Sidebar.css';
import {useNavigate} from 'react-router-dom';

export default function SideBarButton({title, icon, path, isSelected}) {
    const navigate = useNavigate()
    return (
        <>
            <button className={isSelected(path) && 'selected'}
                    onClick={() => navigate(path)}>{icon} {title}
            </button>
        </>

    );
}

