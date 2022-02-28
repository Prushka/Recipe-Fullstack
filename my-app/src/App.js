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
import {getSnackBarNewId, Snackbar} from "./components/snack/Snackbar";


export default function App() {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const PageComponent = ({path, children}) => {
        return (<>
            <Snackbar text={'test 1'} snackbarId={getSnackBarNewId()}/>
            <Snackbar text={'test 2'} snackbarId={getSnackBarNewId()}/>
            <Snackbar text={'test 3'} snackbarId={getSnackBarNewId()}/>
            <Snackbar text={'test 4'} snackbarId={getSnackBarNewId()}/>
            <div className={`${sideBarOpen ? 'side-bar-overlay' : ''}`} onClick={() => setSideBarOpen(false)}/>
            <TopBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}/>
            <div className={'page-body'}>
                <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} currentSelected={path}
                         userIsAdmin={true}/>
                <right-pane>{children}</right-pane>
            </div>
        </>)
    }
    return (<>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"}
                           element={<PageComponent path={"/"}><Home/></PageComponent>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="browse" element={<BrowseRecipe/>}/>
                    <Route path="saved" element={<SavedRecipe/>}/>
                    <Route path="upload" element={<UploadRecipe/>}/>
                    <Route path={"/manage/users"}
                           element={<PageComponent path={"/manage/users"}><AdminManageUsers/></PageComponent>}/>
                    <Route path={"/manage/recipes"}
                           element={<PageComponent path={"/manage/recipes"}><AdminManageRecipes/></PageComponent>}/>
                    <Route path={"/manage/reviews"}
                           element={<PageComponent path={"/manage/reviews"}><AdminManageReviews/></PageComponent>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
