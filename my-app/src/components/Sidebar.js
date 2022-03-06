import food from './food.jpg';
import {CgProfile, CgSearch, CgHomeAlt, CgHeart, CgPen, CgLogOut} from 'react-icons/cg'
import React from 'react';
import '../styles/Sidebar.css';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {


  render () {
    return (
      <div className='sidebar'>
        <img src={food} alt='Food'></img>
        <button><CgHomeAlt></CgHomeAlt> Home</button>
        <Link className="link_text" to={{pathname: "/profile"}}>
          <button><CgProfile></CgProfile> My Profile</button>
        </Link>
        <Link className="link_text" to={{pathname: "/browse"}}>
          <button><CgSearch></CgSearch> Browse Recipes</button>
        </Link>
        <button><CgHeart></CgHeart> Saved Recipes</button>
        <button><CgPen></CgPen> Uploaded Recipes</button>
        <div id='log-out'>
          <button><CgLogOut></CgLogOut> Log-out</button>
        </div>
      </div>
    );
  }
  
}

export default Sidebar;
