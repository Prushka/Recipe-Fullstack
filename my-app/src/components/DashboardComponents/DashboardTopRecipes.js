import React from 'react';
import '../../styles/Dashboard.css';
import {CgHeart} from 'react-icons/cg';

class DashboardTopRecipes extends React.Component {

    getTopThreeRecipes = (e) => {
        // Get data from database (hardcoded for now)
        return ([
            {
                recipeName: 'Veggie Thai Green Curry',
                img: 'https://www.archanaskitchen.com/images/archanaskitchen/0-Archanas-Kitchen-Recipes/2018/Vegetarian_Thai_Green_Curry_Recipe-2-2.jpg',
                likes: 1224
            }, 
            {
                recipeName: 'Dan Dan Noodles',
                img: 'https://hips.hearstapps.com/hmg-prod/images/190226-dan-dan-noodles-253-1552085451.jpg', 
                likes: 1123
            }, 
            {
                recipeName: 'Garlic Butter Shrimp Pad Thai',
                img: 'https://www.halfbakedharvest.com/wp-content/uploads/2020/02/Better-Than-Takeout-Garlic-Butter-Shrimp-Pad-Thai-6-700x467.jpg',
                likes: 928
            }
        ])
    }

    render() {
        const topThreeRecipes = this.getTopThreeRecipes();
        return (
            <div className="grid-item dashboard-top-recipes">
                <div className='grid-top-recipes-title'>
                    Top Three Recipes
                </div>
                {topThreeRecipes.map((recipe) => {
                    return (
                        <DashboardTopRecipeItem recipe={recipe} />
                    )
                })}
            </div>
        )
    }
}

class DashboardTopRecipeItem extends React.Component {
    render() {
        return (
            <div className='top-recipes-item'>
                <img src={this.props.recipe.img} alt={this.props.recipe.recipeName}></img>
                <p>{this.props.recipe.recipeName}</p>
                <p><CgHeart/> {this.props.recipe.likes} <button>Explore</button></p>
            </div>
        )
    }
}

export default DashboardTopRecipes;