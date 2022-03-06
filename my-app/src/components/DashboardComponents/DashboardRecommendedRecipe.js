import React from 'react'; 
import '../../styles/Dashboard.css';
import {CgHeart, CgMathPlus} from 'react-icons/cg';

class DashboardRecommendedRecipe extends React.Component {

    getRecommendedRecipes() {
        // Hardcoded data that will be fetched from database
        return([
            {
                recipeName: 'Lemony Tortellini Soup with Spinach', 
                img: 'https://assets.bonappetit.com/photos/604104ee8fd036af451e9f0a/16:9/w_1920,c_limit/Basically-Tortellini-Soup.jpg'
            }, 
            {
                recipeName: 'Strip Steak au Poivre',
                img: 'https://assets.bonappetit.com/photos/606cdd1ea56a3b6925ed48dc/1:1/w_1920%2Cc_limit/Cook-This-Book-Molly-Baz-Steak.jpg'
            }, 
            {
                recipeName: 'Sheet-Pan Gnocchi',
                img: 'https://assets.bonappetit.com/photos/60a4022a248102a01bcfa0b6/1:1/w_1920%2Cc_limit/0621-Sheet-Pan-Gnocchi.jpg'
            },
            {
                recipeName: 'Classic Banana Pudding',
                img: 'https://assets.bonappetit.com/photos/61042779a36f3ea968547ea7/1:1/w_1920%2Cc_limit/0821-Banana-Pudding-FINAL.jpg'
            },
            {
                recipeName: 'Thai Roast Chicken With Coconut Rice',
                img: 'https://assets.bonappetit.com/photos/608983855799229a8ef966d3/1:1/w_1920%2Cc_limit/Go-Live-Thai-Roast-Chicken.jpg'
            }
        ]);
    }

    render() {
        const recommendedRecipes = this.getRecommendedRecipes();

        return(
            <React.Fragment>
                <div class="grid-item dashboard-recommended-recipe-container">
                    <div className='grid-dashboard-recommended-recipe'>
                        Recommended Recipes For You 
                    </div>
                    {recommendedRecipes.map((recipe) => {
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
                <img src={this.props.recipe.img} alt={this.props.recipe.recipeName}></img>
                <div className='dashboard-recommended-recipe-item-name'>{this.props.recipe.recipeName}</div>
                <div>
                    <button className='dashboard-recommended-recipe-item-button'><CgHeart /></button>
                    <button className='dashboard-recommended-recipe-item-button'><CgMathPlus /></button>
                </div>
            </div>
        )
    }
}

export default DashboardRecommendedRecipe;