import food from '../resources/food.jpg';
import {CgProfile, CgSearch, CgHomeAlt, CgHeart, CgPen, CgLogOut} from 'react-icons/cg'
import React, {useState} from 'react';
import '../styles/Sidebar.css';
import {useNavigate} from 'react-router-dom';

function Sidebar({userIsAdmin = true}) {
    const [currentSelected, setCurrentSelected] = useState('');
    const navigate = useNavigate()
    const goTo = (route) => {
        setCurrentSelected(route)
        navigate(route)
    };
    const isSelected = (route) => {
        return currentSelected===route ? 'selected':''
    }
    return (
        <>
            <div className='sidebar'>
                <img src={food} alt='Food'/>
                <button onClick={() => navigate("/")}><CgHomeAlt/> Home</button>
                <button className={isSelected('My Profile')}><CgProfile/> My Profile</button>
                <button className={isSelected('Browse Recipes')}><CgSearch/> Browse Recipes</button>
                <button className={isSelected('Saved Recipes')}><CgHeart/> Saved Recipes</button>
                <button className={isSelected('Uploaded Recipes')}><CgPen/> Uploaded Recipes</button>
                {userIsAdmin && <>
                    <button className={isSelected('Manage Users')} onClick={() => goTo("/manage/users")}><CgPen/>Manage Users</button>
                    <button onClick={() => goTo("/manage/recipes")}><CgPen/>Manage Recipes</button>
                    <button onClick={() => goTo("/manage/reviews")}><CgPen/>Manage Reviews</button>
                </>
                }
                <div id='log-out'>
                    <button><CgLogOut/> Log-out</button>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
