import React from 'react';
import '../../styles/Dashboard.css';
import {Button} from '../input/Button';
import {CgHeart} from 'react-icons/cg';
import {Link} from 'react-router-dom';
import VeganFood from '../../resources/vegan-food.jpg';
import PorkChop from '../../resources/pork-chop.jpg';
import Chicken from '../../resources/chicken.jpg';
import Salmon from '../../resources/salmon.jpg';

class DashboardTopRecipes extends React.Component {

    getTopThreeRecipes = (e) => {
        // Get data from database (hardcoded for now)
        return ([
            {
                recipeName: 'Creamy Broccoli Vegan Pasta',
                img: VeganFood,
                likes: 1224,
                url: 1
            }, 
            {
                recipeName: 'Grilled Pork Chops with Smoked Paprika Rub',
                img: PorkChop, 
                likes: 1123,
                url: 2
            }, 
            {
                recipeName: 'Air-Fried Frozen Salmon',
                img: Salmon,
                likes: 928,
                url: 3
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
                <div className='top-recipes-button-container'>
                    <CgHeart/> {this.props.recipe.likes} 
                    <Link to={`/recipe/${this.props.recipe.url}`}><Button className='button-explore-recipe'>Explore</Button></Link>
                </div>
            </div>
        )
    }
}

export default DashboardTopRecipes;