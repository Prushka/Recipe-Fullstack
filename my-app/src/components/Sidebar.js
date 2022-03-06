import food from '../images/food.jpg';
import {CgProfile, CgSearch, CgHomeAlt, CgHeart, CgPen, CgLogOut} from 'react-icons/cg'
import React from 'react';
import '../styles/Sidebar.css';
// import {Link} from 'react-router-dom';

function Sidebar() {
  return (
    <React.Fragment>
      <div className='sidebar'>
        <img src={food} alt='Food'></img>
        <button><CgHomeAlt></CgHomeAlt> Home</button>
        <button><CgProfile></CgProfile> My Profile</button>
        <button><CgSearch></CgSearch> Browse Recipes</button>
        <button><CgHeart></CgHeart> Liked Recipes</button>
        <button><CgPen></CgPen> Personal Recipes</button>
        <div id='log-out'>
          <button><CgLogOut></CgLogOut> Log-out</button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Sidebar;
