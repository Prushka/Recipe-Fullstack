import React from 'react';
import './css';
import '../../src/styles/Sidebar.css';
import { Link } from 'react-router-dom';


class SavedRecipe extends React.Component {
    render() {
        return (
            <React.Fragment>

                <div className='saved_recipe'>
                    <div className='saved_recipe_header'>
                        <p className='saved_recipe_text'>Saved Recipes</p>
                    </div>

                    <div className='savedRecipeList'>

                        <div>
                            <Link to={'/recipe/1'}>
                                <h5 className='link_to_recipe'>Recipe1</h5>
                            </Link>
                            <img className="recipePicture" src="food.jpg" alt="" />
                        </div>
                    </div>

                    <div>
                        <div className="savedContent">
                        <Link to={'/recipe/2'}>
                            <h5 className='link_to_recipe'>Recipe2</h5>
                        </Link>
                            <img className="recipePicture" src="food.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default SavedRecipe;
