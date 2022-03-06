import React from 'react';
import '../../styles/Home.css';
import sushi from '../../images/sushi.jpg'
import {CgHeart, CgMathPlus} from 'react-icons/cg';

class HomeRecommendRecipe extends React.Component {

    getRecommendedRecipes = () => {
        return (
            ['Sushi', 'Salad', 'Steak']
        )
    }

    render() {
        const recommendedRecipes = this.getRecommendedRecipes();
        return (
            <div class="grid-item home-recommended-recipe-item">
                <div className='grid-recommended-category-title'>
                    Recommended Recipes  
                </div>
                {recommendedRecipes.map((recipe) => {
                    return(
                        <RecommendRecipeItem recipeName={recipe} />
                    )
                })}
            </div>
        )
    }
}

class RecommendRecipeItem extends React.Component {

    render() {
        return (
            <div className='recommend-recipe-item'>
                <img src={sushi} alt='categoryImage' />
                <p>{this.props.recipeName}</p>
                <span className='recommend-recipe-item-icons'>
                    <button><CgHeart size="1.5vw"/></button>
                    <button><CgMathPlus size="1.5vw"/></button>
                </span>
            </div>
        )
    }
}

export default HomeRecommendRecipe;