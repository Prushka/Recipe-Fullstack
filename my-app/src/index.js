import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*<<<<<<< HEAD
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from "./components/Profile";
import BrowseRecipe from "./components/BrowseRecipe";
import SavedRecipe from "../src/components/SavedRecipe/SavedRecipe";
import UploadRecipe from "./components/UploadRecipe";
import Login from "./components/LogIn_SignUp/Login";
import SignUp from "./components/LogIn_SignUp/SignUp";
import Sidebar from "../src/components/Sidebar";


ReactDOM.render(
  <>
    <BrowserRouter>
            <Routes>
                <Route path="home" element={<Home/>}/>
                <Route path="sidebar" element={<Sidebar/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="browse" element={<BrowseRecipe/>}/>
                <Route path="saved" element={<SavedRecipe/>}/>
                <Route path="upload" element={<UploadRecipe/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="signup" element={<SignUp/>}/>
                
            </Routes>
        </BrowserRouter>
    </>,
  document.getElementById('root')
);

*/


import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
