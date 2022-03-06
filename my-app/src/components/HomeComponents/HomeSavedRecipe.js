import React from 'react';
import '../../styles/Home.css';

class HomeSavedRecipe extends React.Component {

    render() {
        return (
            <div className="grid-item home-continue-saved-recipes">
                <div className='grid-continue-saved-recipes-title'>
                    Continue Saved Recipes  
                </div>
                <HomeSavedRecipeItem />
                <HomeSavedRecipeItem />
                <HomeSavedRecipeItem />
            </div>
        )
    }
}

class HomeSavedRecipeItem extends React.Component {
    render() {
        return (
            <div className='continue-saved-recipes-item'>
                <p>Fish</p>
            </div>
        )
    }
}

export default HomeSavedRecipe;