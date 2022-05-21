import React from 'react'; 
import '../../styles/Dashboard.css';
import {CgHeart, CgMathPlus} from 'react-icons/cg';
import {Link} from 'react-router-dom';
import {Button} from '../input/Button';
import {RecipeAPI} from '../../axios/Axios';

class DashboardRecommendedRecipe extends React.Component {

    state = {
        recommendedRecipes: []
    }

    componentDidMount() {
        RecipeAPI.get('/').then(res => {
            this.setState({
                recommendedRecipes: res.data.slice(0, 5)
            });
        })
    }
    
    render() {
        return(
            <React.Fragment>
                <div className="grid-item dashboard-recommended-recipe-container">
                    <div className='grid-dashboard-recommended-recipe'>
                        Recommended Recipes For You 
                    </div>
                    {this.state.recommendedRecipes.map((recipe) => {
                        return(
                            <RecommendedRecipeItem recipe={recipe} />
                        );
                    })}
                </div> 
            </React.Fragment>
        )
    }
}

class RecommendedRecipeItem extends React.Component {

    render() {
        return(
            <div className='dashboard-recommended-recipe-item'>
                <img src={this.props.recipe.thumbnail} alt={this.props.recipe.title}/>
                <div className='dashboard-recommended-recipe-item-name'>{this.props.recipe.title}</div>
                <div className='dashboard-recommended-recipe-button-container'>
                    <button className='dashboard-recommended-recipe-item-button'><CgHeart /></button>
                    <button className='dashboard-recommended-recipe-item-button'><CgMathPlus /></button>
                    <Link to={{pathname: `/recipe/${this.props.recipe._id}`, state: {param: this.props.recipe._id}}}><Button className='button-explore-recipe'>Explore</Button></Link>
                </div>
            </div>
        )
    }
}

export default DashboardRecommendedRecipe;