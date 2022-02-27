/*
 * Copyright 2022 Dan Lyu.
 */

import React, {useState} from 'react';
import './index.css';
import Home from './components/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Profile from "./components/Profile";
import BrowseRecipe from "./components/BrowseRecipe";
import SavedRecipe from "./components/SavedRecipe";
import UploadRecipe from "./components/UploadRecipe";
import SideBar from "./pages/SideBar";
import {AdminManageRecipes, AdminManageUsers, AdminManageReviews} from "./pages/Admin";
import TopBar from "./pages/TopBar";


export default function App() {
    const [sideBarOpen, setSideBarOpen] = useState();
    const PageComponent = ({path, children}) => {
        return (<>
            <TopBar setSideBarOpen={setSideBarOpen}/>
            <page-body>
                <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} currentSelected={path}
                         userIsAdmin={true}/>
                <right-pane>{children}</right-pane>
            </page-body>
        </>)
    }
    return (<>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<><SideBar currentSelected={"/"} userIsAdmin={true}/><Home/></>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="browse" element={<BrowseRecipe/>}/>
                    <Route path="saved" element={<SavedRecipe/>}/>
                    <Route path="upload" element={<UploadRecipe/>}/>
                    <Route path="/manage/users"
                           element={<PageComponent path={"/manage/users"}> <AdminManageUsers/></PageComponent>}/>
                    <Route path="/manage/recipes" element={<><SideBar currentSelected={"/manage/recipes"}
                                                                      userIsAdmin={true}/>
                        <right-pane><AdminManageRecipes/></right-pane>
                    </>}/>
                    <Route path="/manage/reviews"
                           element={<><SideBar currentSelected={"/manage/reviews"} userIsAdmin={true}/>
                               <right-pane><AdminManageReviews/></right-pane>
                           </>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
