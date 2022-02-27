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
    const WrappedSideBarButton = ({title, path, icon}) => {
        return (<SideBarButton setSideBarOpen={props.setSideBarOpen} title={title} path={path} isSelected={isSelected} icon={icon}/>)
    }
    return (
        <div className={`side-bar ${props.sideBarOpen ? null : 'closed'}`} onClick={(e) => {
            e.stopPropagation();
        }}>
            <img src={food} alt='Food'/>
            <WrappedSideBarButton title='home' path='/' icon={<CgHomeAlt/>}/>
            <WrappedSideBarButton title='My Profile' path='/' icon={<CgProfile/>}/>
            <WrappedSideBarButton title='Browse Recipes' path='/' icon={<CgSearch/>}/>
            <WrappedSideBarButton title='Saved Recipes' path='/' icon={<CgHeart/>}/>
            <WrappedSideBarButton title='Uploaded Recipes' path='/' icon={<CgPen/>}/>
            {props.userIsAdmin && <>
                <WrappedSideBarButton title='Manage Users' path='/manage/users' icon={<MdManageAccounts/>}/>
                <WrappedSideBarButton title='Manage Recipes' path='/manage/recipes' icon={<IoFastFood/>}/>
                <WrappedSideBarButton title='Manage Reviews' path='/manage/reviews' icon={<MdOutlinePreview/>}/>
            </>
            }
            <SideBarButton style={{alignSelf: 'end', marginTop: 'auto'}} title='Log-out' path={'/5'}
                           isSelected={isSelected} icon={<CgLogOut/>}/>
        </div>
    );
}

export default SideBar;
