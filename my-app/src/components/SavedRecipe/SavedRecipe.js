import React from 'react';
import '../SavedRecipe/SavedRecipe.css';
import Sidebar from '../Sidebar.js';
import '../../styles/Sidebar.css';
import { Link } from 'react-router-dom';


class SavedRecipe extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Sidebar />

                <div id='saved'>
                    <div class='header'>
                        <p>Saved Recipes</p>
                    </div>

                    <div class='savedRecipeList'>

                        <div class="savedContent">
                            <Link to={'/browse'}><h5>Recipe1</h5></Link>
                            <img class="recipePicture" src="food.jpg" alt="" />
                        </div>
                    </div>

                    <div class='savedRecipeList'>
                        <div class="savedContent">
                        <Link to={'/browse'}><h5>Recipe2</h5></Link>
                            <img class="recipePicture" src="food.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default SavedRecipe;