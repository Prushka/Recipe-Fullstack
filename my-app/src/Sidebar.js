import food from './food.jpg';
import {CgProfile, CgSearch, CgHomeAlt, CgHeart, CgPen, CgLogOut} from 'react-icons/cg'
import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <React.Fragment>
      <div className='sidebar'>
        <img src={food} alt='Food'></img>
        <button><CgHomeAlt></CgHomeAlt> Home</button>
        <button><CgProfile></CgProfile> My Profile</button>
        <button><CgSearch></CgSearch> Browse Recipes</button>
        <button><CgHeart></CgHeart> Saved Recipes</button>
        <button><CgPen></CgPen> Uploaded Recipes</button>
        <div id='log-out'>
          <button><CgLogOut></CgLogOut> Log-out</button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Sidebar;
