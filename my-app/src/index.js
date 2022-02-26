import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from "./components/Profile";
import BrowseRecipe from "./components/BrowseRecipe";
import SavedRecipe from "./components/SavedRecipe";
import UploadRecipe from "./components/UploadRecipe";
import Sidebar from "./pages/Sidebar";
import Admin from "./pages/Admin";

ReactDOM.render(
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<><Sidebar currentSelected={"/manage/users"} userIsAdmin={true}/><Home/></>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="browse" element={<BrowseRecipe/>}/>
                <Route path="saved" element={<SavedRecipe/>}/>
                <Route path="upload" element={<UploadRecipe/>}/>
                <Route path="/manage/users" element={<><Sidebar currentSelected={"/manage/users"} userIsAdmin={true}/><Admin/></>}/>
                <Route path="/manage/recipes" element={<><Sidebar currentSelected={"/manage/recipes"} userIsAdmin={true}/><Admin/></>}/>
                <Route path="/manage/reviews" element={<><Sidebar currentSelected={"/manage/reviews"} userIsAdmin={true}/><Admin/></>}/>
            </Routes>
        </BrowserRouter>
    </>,
  document.getElementById('root')
);

