import React, {useState} from 'react';
import './index.css';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SavedRecipe from "./components/SavedRecipe/SavedRecipe";
import SideBar from "./pages/SideBar";
import {AdminManageRecipes, AdminManageUsers, ManageReviews} from "./pages/Admin";
import TopBar from "./pages/TopBar";
import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";
import {useDispatch, useSelector} from "react-redux";
import Profile from "./pages/profile/Profile";
import BrowseRecipe from "./pages/recipe/BrowseRecipe";
import PersonalRecipe from "./pages/recipe/PersonalRecipe";

export default function App() {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const PageComponent = ({path, children}) => {
        return (<>
            <div className={`${sideBarOpen ? 'side-bar-overlay' : ''}`} onClick={() => setSideBarOpen(false)}/>
            <TopBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}/>
            <div className={'page-body'}>
                <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} currentSelected={path}/>
                <right-pane>{children}</right-pane>
            </div>
        </>)
    }
    return (<>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/signup'} element={<Signup/>}/>
                    <Route path={"dashboard"}
                           element={<PageComponent path={"/dashboard"}><Dashboard/></PageComponent>}/>
                    <Route path={"profile"}
                           element={<PageComponent path={"/profile"}><Profile user={useSelector((state) => state.user)}/></PageComponent>}/>
                    <Route path={"browse"}
                           element={<PageComponent path={"/browse"}><BrowseRecipe/></PageComponent>}/>
                    <Route path="/saved" element={<PageComponent path={"/saved"}><SavedRecipe/></PageComponent>}/>
                    <Route path="personal-recipes"
                           element={<PageComponent path={"/personal-recipes"}><PersonalRecipe/></PageComponent>}/>
                    <Route path={"/reviews"}
                           element={<PageComponent path={"/reviews"}><ManageReviews/></PageComponent>}/>
                    <Route path={"/manage/users"}
                           element={<PageComponent path={"/manage/users"}><AdminManageUsers/></PageComponent>}/>
                    <Route path={"/manage/recipes"}
                           element={<PageComponent path={"/manage/recipes"}><AdminManageRecipes/></PageComponent>}/>
                    <Route path={"/manage/reviews"}
                           element={<PageComponent path={"/manage/reviews"}><ManageReviews/></PageComponent>}/>
                </Routes>
            </BrowserRouter>
        </>
    )

}