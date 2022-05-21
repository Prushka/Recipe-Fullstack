import React from 'react'; 
import '../src/styles/PersonalRecipes.css';
import {CgClose} from 'react-icons/cg';
import {Button} from '../src/components/input/Button';
import {RecipeAPI, FileUploadAPI} from "../src/axios/Axios";

class PersonalRecipes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchName: '',
            allPersonalRecipes: [],
            showFilteredRecipes: [],
            showAddRecipeModal: false,
            needUpdate: false
        };
    }

    componentDidMount() {
        // When initial render, fetch from database
        this.fetchFromDatabaseAndSetState();
    }


    componentDidUpdate() {
        // When update component, fetch from database
        // if (JSON.stringify(prevState.allPersonalRecipes) !== JSON.stringify(this.state.allPersonalRecipes)) {
        //     this.fetchFromDatabaseAndSetState()
        // }

        // Fetch from database when needed
        if (this.state.needUpdate) {
            this.fetchFromDatabaseAndSetState()
            this.setState({
                needUpdate: false
            })
        }
    }

    fetchFromDatabaseAndSetState() {
        RecipeAPI.get('/me').then(res => {
            const personalRecipes = res.data;
            this.setState({
                allPersonalRecipes: personalRecipes,
                showFilteredRecipes: personalRecipes,
            })
        })
    }

    showAddRecipeModal = (e) => {
        this.setState({
            showAddRecipeModal: !this.state.showAddRecipeModal,
            needUpdate: true
        })
        this.forceUpdate()
    }

    filterRecipe = (e) => {
        const recipeFilterWord = e.target.value;

        if (recipeFilterWord !== '') {
            // show filtered recipes
            const recipeResults = this.state.allPersonalRecipes.filter((recipe) => {
                if (recipe.title.includes(recipeFilterWord)) {
                    return recipe;
                } else {
                    return null;
                }
            });
            this.setState({showFilteredRecipes: recipeResults, searchName: recipeFilterWord});
        } else {
            // show all recipes
            this.setState({
                showFilteredRecipes: this.state.allPersonalRecipes,
                searchName: recipeFilterWord
            });
        }
    }

    deleteRecipe = (e, idToRemove) => {
        // Delete recipe
        RecipeAPI.delete('/' + idToRemove);

        RecipeAPI.get('/me').then(res => {
            const personalRecipes = res.data;
            console.log(res.data)
            this.setState({
                allPersonalRecipes: personalRecipes,
                showFilteredRecipes: personalRecipes,
                needUpdate: true
            })
        })
        this.forceUpdate()
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
                    </div>
                    <div className='recipes-list'>
                        {personalRecipesToShow.map((recipe) => {
                            let r = {
                                id: recipe._id,
                                recipeName: recipe.title,
                                img: recipe.thumbnail
                            }
                            return (
                                <RecipeListItem recipe={r} deleteRecipe={this.deleteRecipe} recipeData={recipe}/>
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

    constructor(props) {
        super(props);
        this.state = {
            showEditRecipeModal: false
        };
    }

    showEditRecipeModal = (e) => {
        this.setState({
            showEditRecipeModal: !this.state.showEditRecipeModal
        })
    }

    deleteRecipe = (e, id) => {
        this.props.deleteRecipe(e, id);
    }

    render() {
        const {id, recipeName, img} = this.props.recipe;
        console.log(img)
        return (
            <React.Fragment>
                <div className='recipe-list-item'>
                    <div className='recipe-list-item-img'>
                        <img src={img} alt={recipeName}/>
                    </div>
                    <div className='recipe-list-item-title'>
                        <h3>{recipeName}</h3>
                    </div>
                    <div className='recipe-list-item-button-container'>
                        <Button className='button-personal-recipe-more-details'>More Details</Button>
                        <Button className='button-personal-recipe-edit-recipe' onClick={(e) => {this.showEditRecipeModal()}}>Edit Recipe</Button>
                        <Button className='button-personal-recipe-delete' onClick={(e) => {this.deleteRecipe(e, id)}}>Delete</Button>
                    </div>
                </div>
                <EditRecipeModal onClose={this.showEditRecipeModal} showEditRecipeModal={this.state.showEditRecipeModal} recipeFields={this.props.recipeData} />
            </React.Fragment>
        );
    }
}

class AddRecipeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgFile: null,
            imgStoreWith: '',
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
        // submit new recipe to database
        if (this.state.recipeName !== '' || this.state.recipeInstructions !== '' || this.state.ingredients !== []) {
            const data = {
                title: this.state.recipeName,
                category: this.state.diet,
                instructions: this.state.recipeInstructions,
                ingredients: this.state.ingredients,
                tags: this.state.tags,
                thumbnail: this.state.imgStoreWith
            }
            RecipeAPI.post('/', data);
            
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

    handleFileUpload = async (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        const response = await FileUploadAPI.post("", formData)
        this.setState({
            imgStoreWith: response.data['storeWith']
        })
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
                                        accept="image/*"
                                        onChange={this.handleFileUpload}>
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


class EditRecipeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgFile: null,
            imgStoreWith: '',
            recipeName: '',
            currentTagInput: '',
            tags: [],
            ingredients: [], 
            ingredientForm: '',
            recipeInstructions: '',
            diet: ''
        };
    }

    componentDidMount() {
        this.setState({
            recipeName: this.props.recipeFields.title,
            currentTagInput: '',
            tags: this.props.recipeFields.tags,
            ingredients: this.props.recipeFields.ingredients, 
            ingredientForm: '',
            recipeInstructions: this.props.recipeFields.instructions,
            diet: this.props.recipeFields.category
        })
    }

    onClose = (e, fromX) => {
        this.props.onClose && this.props.onClose(e);
        if (fromX) {
            this.setState({
                recipeName: this.props.recipeFields.title,
                currentTagInput: '',
                tags: this.props.recipeFields.tags,
                ingredients: this.props.recipeFields.ingredients, 
                ingredientForm: '',
                recipeInstructions: this.props.recipeFields.instructions,
                diet: this.props.recipeFields.category
            })
        } else {
            this.setState({
                recipeName: this.state.recipeName,
                currentTagInput: '',
                tags: this.state.tags,
                ingredients: this.state.ingredients, 
                ingredientForm: '',
                recipeInstructions: this.state.recipeInstructions,
                diet: this.state.diet
            })
        }
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

    editRecipe = (e) => {
        // edit recipe
        if (this.state.recipeName !== '' || this.state.recipeInstructions !== '' || this.state.ingredients !== []) {
            const data = {
                title: this.state.recipeName,
                category: this.state.diet,
                instructions: this.state.recipeInstructions,
                ingredients: this.state.ingredients,
                tags: this.state.tags,
                thumbnail: this.state.imgStoreWith
            }
            RecipeAPI.patch('/' + this.props.recipeFields._id, data);
        }

        this.onClose(e, false);
    }

    handleFileUpload = async (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        const response = await FileUploadAPI.post("", formData)
        this.setState({
            imgStoreWith: response.data['storeWith']
        })
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
        if(!this.props.showEditRecipeModal){
            return null;
        } else {
            return (
                <div className="add-recipe-modal-container">
                    <div className="add-recipe-modal">
                        <div className="add-recipe-modal-header">
                            <h3>Edit recipe</h3>
                            <button onClick={e => {this.onClose(e, true)}} className='no-style-button'>
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
                                        accept="image/*"
                                        onChange={this.handleFileUpload}>
                                    </input>
                                </form>
                                <form className='add-recipe-modal-form recipe-name' onSubmit={e => { e.preventDefault(); }}>
                                    <label htmlFor="text" >Recipe Name: </label>
                                    <input type="text" 
                                        value={this.state.recipeName}
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
                                            value={this.state.recipeInstructions}
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
                                                   checked={this.state.diet === 'Omnivore'}
                                                   onChange={(e) => {this.setState({diet: e.currentTarget.value})}}>
                                            </input>
                                            <label className='diet-label' htmlFor="omnivore">Omnivore</label>
                                            <br></br>
                                            <input type="radio" 
                                                   id="pescatarian" 
                                                   name="diet" 
                                                   value="Pescatarian" 
                                                   checked={this.state.diet === 'Pescatarian'}
                                                   onChange={(e) => {this.setState({diet: e.currentTarget.value})}}>
                                            </input>
                                            <label className='diet-label' htmlFor="pescatarian">Pescatarian</label>
                                            <br></br>
                                            <input type="radio" 
                                                   id="vegetarian" 
                                                   name="diet" 
                                                   value="Vegetarian" 
                                                   checked={this.state.diet === 'Vegetarian'}
                                                   onChange={(e) => {this.setState({diet: e.currentTarget.value})}}>
                                            </input>
                                            <label className='diet-label' htmlFor="vegetarian">Vegetarian</label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='submit-recipe-button-container'>
                                <Button className='button-submit-recipe' onClick={(e) => {this.editRecipe(e)}}>Edit Recipe</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


export default PersonalRecipes;