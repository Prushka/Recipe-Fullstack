import React from 'react'; 
import '../styles/PersonalRecipes.css';
import {CgClose} from 'react-icons/cg';
import {Button} from './input/Button';
import data from '../data';

/* Import Dummy Data */
let allRecipes = data;
let newId = 213891943;

class PersonalRecipes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchName: '',
            showFilteredRecipes: this.getPersonalRecipes(),
            showAddRecipeModal: false
        };
    }

    showAddRecipeModal = (e) => {
        this.setState({
            showAddRecipeModal: !this.state.showAddRecipeModal
        })
    }

    getPersonalRecipes = () => {
        // Get all personal recipes created by the user from database
        // Currently, hardcoded 
        return allRecipes;
    }

    filterRecipe = (e) => {
        const recipeFilterWord = e.target.value;
        const allPersonalRecipes = this.getPersonalRecipes();

        if (recipeFilterWord !== '') {
            // show filtered recipes
            const recipeResults = allPersonalRecipes.filter((recipe) => {
                if (recipe.recipeName.includes(recipeFilterWord)) {
                    return recipe;
                } else {
                    return null;
                }
            });
            this.setState({showFilteredRecipes: recipeResults, searchName: recipeFilterWord});
        } else {
            // show all recipes
            this.setState({
                showFilteredRecipes: this.getPersonalRecipes(),
                searchName: recipeFilterWord
            });
        }
    }

    deleteRecipe = (e, idToRemove) => {
        allRecipes = allRecipes.filter((recipe) => {
            if (recipe.id !== idToRemove) {
                return recipe
            } else {
                return null
            }
        });
        
        this.setState({
            searchName: this.state.searchName,
            showFilteredRecipes: allRecipes
        })
    }

    render() {
        const personalRecipesToShow = this.state.showFilteredRecipes;

        return (
            <React.Fragment>
                <div className='upload-grid-container'>
                    <div className='container-title'><h2>My Recipes</h2></div>
                    <div className="container-input">
                        <input
                            type="search"
                            className="input"
                            value={this.searchName}
                            onChange={this.filterRecipe}
                            placeholder="Recipe Name"
                        />
                        <Button className='button-personal-recipe-add' onClick={(e) => {this.showAddRecipeModal()}}>Add Recipe</Button>
                        {/* <button className='recipe-button white' onClick={(e) => {this.showAddRecipeModal()}}>
                            Add Recipe
                        </button> */}
                    </div>
                    <div className='recipes-list'>
                        {personalRecipesToShow.map((recipe) => {
                            return (
                                <RecipeListItem recipe={recipe} deleteRecipe={this.deleteRecipe}/>
                            );
                        })}
                    </div>
                </div>
                <AddRecipeModal onClose={this.showAddRecipeModal} showAddRecipeModal={this.state.showAddRecipeModal} />
            </React.Fragment>
        );
    }
}

class RecipeListItem extends React.Component {

    deleteRecipe = (e, id) => {
        this.props.deleteRecipe(e, id);
    }

    render() {
        const {id, recipeName, img} = this.props.recipe;
        return (
            <div className='recipe-list-item'>
                <div className='recipe-list-item-img'>
                    <img src={img} alt={recipeName}/>
                </div>
                <div className='recipe-list-item-title'>
                    <h3>{recipeName}</h3>
                </div>
                <div className='recipe-list-item-button-container'>
                    <Button className='button-personal-recipe-more-details'>More Details</Button>
                    <Button className='button-personal-recipe-delete' onClick={(e) => {this.deleteRecipe(e, id)}}>Delete</Button>
                    {/* <button className='recipe-button red' onClick={(e) => {this.deleteRecipe(e, id)}}>
                        Delete
                    </button> */}
                </div>
            </div>
        );
    }
}

class AddRecipeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeName: '',
            currentTagInput: '',
            tags: [],
            ingredients: [], 
            ingredientForm: '',
            recipeInstructions: '',
            diet: ''
        };
    }

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
        this.setState({
            recipeName: '',
            currentTagInput: '',
            tags: [],
            ingredients: [], 
            ingredientForm: '',
            recipeInstructions: '',
            diet: ''
        })
    };

    addIngredientToList = (e, ingredient) => {
        e.preventDefault();
        if (ingredient !== '') {
            this.setState({
                ingredients: [...this.state.ingredients, this.state.ingredientForm],
                ingredientForm: ''
            })
        }
    }

    removeIngredientFromList = (e, ingredient) => {
        e.preventDefault();
        this.setState({
            ingredients: this.state.ingredients.filter(name => name !== ingredient)
        })
    }

    submitNewRecipe = (e) => {
        if (this.state.recipeName !== '' || this.state.recipeInstructions !== '' || this.state.ingredients !== []) {
            allRecipes.push({
                id: newId,
                recipeName: this.state.recipeName,
                img: 'https://jorgeraziel.com/wp-content/themes/consultix/images/no-image-found-360x260.png'
            })
            newId++;
        }
        this.onClose();
    }

    handleAddTag = (e) => {
        this.setState({
            currentTagInput: e.target.value
        })
    }

    addTag = (e) => {
        if (e.keyCode === 13 && e.target.value !== '') {
            this.setState({
                tags: [...this.state.tags, this.state.currentTagInput],
                currentTagInput: ''
            });
        }
    }

    deleteTag = (e, tag) => {
        let idx = this.state.tags.indexOf(tag);
        this.setState({
            tags: this.state.tags.filter((_, index) => idx !== index)
        });
    }

    render() {
        const ingredients = this.state.ingredients;
        if(!this.props.showAddRecipeModal){
            return null;
        } else {
            return (
                <div className="add-recipe-modal-container">
                    <div className="add-recipe-modal">
                        <div className="add-recipe-modal-header">
                            <h3>Create new recipe</h3>
                            <button onClick={e => {this.onClose(e)}} className='no-style-button'>
                                <CgClose />
                            </button>
                        </div>
                        <div className='add-recipe-modal-form-container'>
                            <div>
                                <form className='add-recipe-modal-form' onSubmit={e => { e.preventDefault(); }}>
                                    <label htmlFor="img">Select image: </label>
                                    <input type="file" 
                                        id="img" 
                                        name="img" 
                                        accept="image/*">
                                    </input>
                                </form>
                                <form className='add-recipe-modal-form recipe-name' onSubmit={e => { e.preventDefault(); }}>
                                    <label htmlFor="text" >Recipe Name: </label>
                                    <input type="text" 
                                        placeholder="Ex: Risotto" 
                                        onChange={(e) => {this.setState({recipeName: e.target.value})}}>
                                    </input>
                                </form>                
                                <form className='add-recipe-modal-form tags' onSubmit={e => { e.preventDefault(); }}>
                                    <div className='tag-input-container'>
                                        <label htmlFor="text">Tags: </label>
                                        <div className='tag-input'>
                                            {this.state.tags.map((tag) => {
                                                return (
                                                    <span className='tag'>
                                                        {tag} 
                                                        <button className='tag-delete' type='button' onClick={(e) => {this.deleteTag(e, tag)}}>
                                                            X
                                                        </button>
                                                    </span>
                                                )
                                            })}
                                            <input id='tag-input-field' 
                                                   placeholder='Ex. Chinese'
                                                   value={this.state.currentTagInput} 
                                                   type='text' 
                                                   onChange={(e) => {this.handleAddTag(e)}} 
                                                   onKeyDown={(e) => {this.addTag(e)}}>
                                            </input>
                                        </div>
                                    </div>
                                </form>
                                <form className='add-recipe-modal-form ingredients' onSubmit={e => { e.preventDefault(); }}>
                                    <label htmlFor="text">Ingredients: </label>
                                    <input type="text" 
                                        value={this.state.ingredientForm} 
                                        placeholder="Ex: 1 teaspoon of baking powder" 
                                        onChange={(e) => {this.setState({ingredientForm: e.target.value})}}>
                                    </input>
                                    <Button className='button-add-ingredient' onClick={(e) => {this.addIngredientToList(e, this.state.ingredientForm)}}>Add Ingredients</Button>
                                    {/* <button className="recipe-button blue" onClick={(e) => {this.addIngredientToList(e, this.state.ingredientForm)}}>Add Ingredient</button> */}
                                </form>
                                <ul className='ingredients-list'>
                                    {ingredients.map((ingredient) => {
                                        return <li>{ingredient} <button className="ingredient-delete-button" onClick={(e) => {this.removeIngredientFromList(e, ingredient)}}><CgClose /></button></li>
                                    })}
                                </ul>
                            </div>
                            <div>
                                <form className='add-recipe-modal-form instructions' onSubmit={e => { e.preventDefault(); }}>
                                    <label htmlFor="text">Instructions: </label>
                                    <textarea rows="4" 
                                            cols="50" 
                                            placeholder='Add Instructions Here' 
                                            onChange={(e) => {this.setState({recipeInstructions: e.target.value})}}> 
                                    </textarea>
                                </form>
                                <form className='add-recipe-modal-form diet'>
                                    <div className='diet-input-container'>
                                        <label htmlFor="text">Diet: </label>
                                        <div>
                                            <input className='diet-radio-button'
                                                   type="radio" 
                                                   id="omnivore" 
                                                   name="diet" 
                                                   value="Omnivore" 
                                                   onChange={(e) => {this.setState({diet: e.currentTarget.value})}}>
                                            </input>
                                            <label className='diet-label' htmlFor="omnivore">Omnivore</label>
                                            <br></br>
                                            <input type="radio" 
                                                   id="pescatarian" 
                                                   name="diet" 
                                                   value="Pescatarian" 
                                                   onChange={(e) => {this.setState({diet: e.currentTarget.value})}}>
                                            </input>
                                            <label className='diet-label' htmlFor="pescatarian">Pescatarian</label>
                                            <br></br>
                                            <input type="radio" 
                                                   id="vegetarian" 
                                                   name="diet" 
                                                   value="Vegetarian" 
                                                   onChange={(e) => {this.setState({diet: e.currentTarget.value})}}>
                                            </input>
                                            <label className='diet-label' htmlFor="vegetarian">Vegetarian</label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='submit-recipe-button-container'>
                                <Button className='button-submit-recipe' onClick={(e) => {this.submitNewRecipe(e)}}>Submit New Recipe</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


export default PersonalRecipes;