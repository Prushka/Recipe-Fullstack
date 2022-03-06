import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from "./profile/Profile.js";
import BrowseRecipe from "./browse/BrowseRecipe.js";
import SavedRecipe from "./components/SavedRecipe";
import UploadRecipe from "./components/UploadRecipe";
import RecipePage1 from './RecipePage/RecipePage1.js';
import RecipePage2 from './RecipePage/RecipePage2.js';
import RecipePage3 from './RecipePage/RecipePage3.js';
import RecipePage4 from './RecipePage/RecipePage4.js';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
        <Route path="profile" element={<Profile />} />
        <Route path="browse" element={<BrowseRecipe />} />
        <Route path="saved" element={<SavedRecipe />} />
        <Route path="upload" element={<UploadRecipe />} />
        <Route path="recipe/1" element={<RecipePage1 />} />
        <Route path="recipe/2" element={<RecipePage2 />} />
        <Route path="recipe/3" element={<RecipePage3 />} />
        <Route path="recipe/4" element={<RecipePage4 />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

