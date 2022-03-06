import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './components/Dashboard';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from "./components/Profile";
import Home from "./components/Home";
import BrowseRecipe from "./components/BrowseRecipe";
import SavedRecipe from "./components/SavedRecipe";
import UploadRecipe from "./components/UploadRecipe";
import Login from './components/Login';
import SignUp from './components/SignUp';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="browse" element={<BrowseRecipe />} />
      <Route path="saved-recipes" element={<SavedRecipe />} />
      <Route path="personal-recipes" element={<UploadRecipe />} />
      <Route path="login" element={<Login/>} />
      <Route path="signup" element={<SignUp/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

