import food from '../resources/food.jpg';
import {CgProfile, CgSearch, CgHomeAlt, CgHeart, CgPen, CgLogOut} from 'react-icons/cg'
import React from 'react';
import '../styles/Sidebar.css';
import SideBarButton from "../components/input/SideBarButton";
import {MdManageAccounts, MdOutlinePreview} from "react-icons/md";
import {IoFastFood} from "react-icons/io5";

function SideBar(props) {
    const isSelected = (path) => {
        return props.currentSelected === path ? 'selected' : ''
    }
    return (
        <div className={`side-bar ${props.sideBarOpen ? null : 'closed'}`} onClick={(e) => {
            e.stopPropagation();
        }}>
            <img src={food} alt='Food'/>
            <SideBarButton title='Home' path={'/'} isSelected={isSelected} icon={<CgHomeAlt/>}/>
            <SideBarButton title='My Profile' path={'/1'} isSelected={isSelected} icon={<CgProfile/>}/>
            <SideBarButton title='Browse Recipes' path={'/2'} isSelected={isSelected} icon={<CgSearch/>}/>
            <SideBarButton title='Saved Recipes' path={'/3'} isSelected={isSelected} icon={<CgHeart/>}/>
            <SideBarButton title='Uploaded Recipes' path={'/4'} isSelected={isSelected} icon={<CgPen/>}/>
            {props.userIsAdmin && <>
                <SideBarButton title='Manage Users' path={'/manage/users'} isSelected={isSelected}
                               icon={<MdManageAccounts/>}/>
                <SideBarButton title='Manage Recipes' path={'/manage/recipes'} isSelected={isSelected}
                               icon={<IoFastFood/>}/>
                <SideBarButton title='Manage Reviews' path={'/manage/reviews'} isSelected={isSelected}
                               icon={<MdOutlinePreview/>}/>
            </>
            }
            <SideBarButton style={{alignSelf: 'end', marginTop: 'auto'}} title='Log-out' path={'/5'}
                           isSelected={isSelected} icon={<CgLogOut/>}/>
        </div>
    );
}

export default SideBar;
