import food from './food.jpg';
import { CgProfile, CgSearch, CgHomeAlt, CgHeart, CgPen, CgLogOut } from 'react-icons/cg'
import React from 'react';
import '../styles/Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <React.Fragment>
      <div className='sidebar'>
        <img src={food} alt='Food'></img>
        <button><CgHomeAlt></CgHomeAlt> Home</button>
        <button><CgProfile></CgProfile> My Profile</button>
        <button><CgSearch></CgSearch> Browse Recipes</button>
        <Link to={"/saved"} style={{ textDecoration: 'none' }}>
          <button><CgHeart></CgHeart> Saved Recipes</button>
        </Link>
        <button><CgPen></CgPen> Uploaded Recipes</button>
        <div id='log-out'>
          <Link to={"/login"} style={{ textDecoration: 'none' }}>
            <button><CgLogOut></CgLogOut> Log-out</button>
          </Link>

        </div>
      </div>
    </React.Fragment>
  );
}

export default Sidebar;
