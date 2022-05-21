import React from 'react';
import '../../styles/Dashboard.css';
import {Button} from '../input/Button';
import {CgHeart} from 'react-icons/cg';
import {Link} from 'react-router-dom';
import {RecipeAPI} from '../../axios/Axios';

class DashboardTopRecipes extends React.Component {

    state = {
        topThreeRecipes: []
    }

    componentDidMount() {
        // Fetch the top 3 recipes from database
        RecipeAPI.get('/').then(res => {
            this.setState({
                topThreeRecipes: res.data.slice(0, 3)
            });
        })
    }

    render() {
        const topThreeRecipes = this.state.topThreeRecipes;
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
                <img src={this.props.recipe.thumbnail} alt={this.props.recipe.title}></img>
                <p>{this.props.recipe.title}</p>
                <div className='top-recipes-button-container'>
                    <CgHeart/> {this.props.recipe.likes}
                    <Link to={`/recipe/${this.props.recipe.url}`}><Button className='button-explore-recipe'>Explore</Button></Link>
                </div>
            </div>
        )
    }
}

export default DashboardTopRecipes;