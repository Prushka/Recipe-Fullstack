import {CgProfile, CgSearch, CgHomeAlt, CgHeart, CgPen, CgLogOut} from 'react-icons/cg'
import React, {useEffect} from 'react';
import '../styles/Sidebar.css';
import SideBarButton from "../components/input/SideBarButton";
import {MdManageAccounts, MdOutlinePreview} from "react-icons/md";
import {IoFastFood} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserSession, logout} from "../axios/Axios";
import {useNavigate} from "react-router-dom";
import {userIsAdmin} from "../util";
import {BsFillStarFill} from "react-icons/bs";

function SideBar(props) {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        fetchUserSession(user, navigate, dispatch).then()
    }, [dispatch, navigate, user])


    const isSelected = (path) => {
        return props.currentSelected === path ? 'selected' : ''
    }
    const WrappedSideBarButton = ({title, path, icon, onClick}) => {
        return (<SideBarButton onClick={onClick} setSideBarOpen={props.setSideBarOpen} title={title} path={path}
                               isSelected={isSelected} icon={icon}/>)
    }
    return (
        <div className={`side-bar ${props.sideBarOpen ? null : 'closed'}`} onClick={(e) => {
            e.stopPropagation();
        }}>
            <div className={'avatar__container'}>
                <img src={user.avatar} alt='avatar'/>
            </div>

            <div className={'side-bar__username'}>{user.name}</div>

            <div className={'side-bar-top-group'}>
                <WrappedSideBarButton title='Dashboard' path='/dashboard' icon={<CgHomeAlt/>}/>
                <WrappedSideBarButton title='Browse Recipes' path='/browse' icon={<CgSearch/>}/>
                <WrappedSideBarButton title='Saved Recipes' path='/saved' icon={<CgHeart/>}/>
                <WrappedSideBarButton title='My Profile' path='/profile' icon={<CgProfile/>}/>
                <WrappedSideBarButton title='My Recipes' path='/personal/recipes' icon={<CgPen/>}/>
                {userIsAdmin(user) ? <>
                    <WrappedSideBarButton title='Manage Users' path='/manage/users' icon={<MdManageAccounts/>}/>
                    <WrappedSideBarButton title='Manage Recipes' path='/manage/recipes' icon={<IoFastFood/>}/>
                    <WrappedSideBarButton title='Manage Reviews' path='/manage/reviews' icon={<MdOutlinePreview/>}/>
                </> : <>
                    <WrappedSideBarButton title='My Reviews' path='/reviews' icon={<BsFillStarFill/>}/>
                </>
                }
            </div>
            <div className={'side-bar__bottom-group'}>
                <WrappedSideBarButton title='Log-out' path={undefined}
                                      onClick={async () => {
                                          await logout()
                                          navigate("/login")
                                      }}
                                      icon={<CgLogOut/>}/>
            </div>
        </div>
    );
}

export default SideBar;
