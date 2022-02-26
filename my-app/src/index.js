import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from "./components/Profile";
import BrowseRecipe from "./components/BrowseRecipe";
import SavedRecipe from "./components/SavedRecipe";
import UploadRecipe from "./components/UploadRecipe";
import Sidebar from "./components/Sidebar";
import Admin from "./pages/Admin";

ReactDOM.render(
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="browse" element={<BrowseRecipe/>}/>
                <Route path="saved" element={<SavedRecipe/>}/>
                <Route path="upload" element={<UploadRecipe/>}/>
                <Route path="/manage/users" element={<><Sidebar userIsAdmin={true}/><Admin/></>}/>
                <Route path="/manage/recipes" element={<><Sidebar userIsAdmin={true}/><Admin/></>}/>
                <Route path="/manage/reviews" element={<><Sidebar userIsAdmin={true}/><Admin/></>}/>
            </Routes>
        </BrowserRouter>
    </>,
  document.getElementById('root')
);

