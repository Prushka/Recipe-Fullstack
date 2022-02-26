import food from '../resources/food.jpg';
import {CgProfile, CgSearch, CgHomeAlt, CgHeart, CgPen, CgLogOut} from 'react-icons/cg'
import React from 'react';
import '../styles/Sidebar.css';
function Sidebar() {
  return (
    <>
      <div className='sidebar'>
        <img src={food} alt='Food'/>
        <button><CgHomeAlt/> Home</button>
        <button><CgProfile/> My Profile</button>
        <button><CgSearch/> Browse Recipes</button>
        <button><CgHeart/> Saved Recipes</button>
        <button><CgPen/> Uploaded Recipes</button>
        <div id='log-out'>
          <button><CgLogOut/> Log-out</button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
