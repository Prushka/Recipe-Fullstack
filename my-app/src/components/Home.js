import React from 'react';
import logo from "../resources/logo.jpg";
import '../styles/Home.css';
import {Link, useNavigate} from 'react-router-dom';
import {BlueBGButton} from './input/Button';

export default function Home({}) {
    const navigate = useNavigate()
    return (
        <>
            <div className='navbar'>
                <img src={logo} alt='logo'/>
                <div className='navbar__buttons'>
                    <BlueBGButton onClick={
                        ()=>{navigate('/login')}
                    }>Log In</BlueBGButton>
                    <BlueBGButton onClick={
                        ()=>{navigate('/signup')}
                    }>Sign Up</BlueBGButton>
                </div>
            </div>
            <div className='home-content'>
                <div className='home-content-text'>
                    <h1>Find Your Own Personal Recipe From a Vast Library</h1>
                    <p>A website library with different recipes curated for you shared by other users</p>
                </div>
            </div>
        </>
    )
}