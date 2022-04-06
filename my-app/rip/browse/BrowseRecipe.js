import React from 'react'; 
import SideBar from '../../src/pages/SideBar.js'
import SearchBar from './SearchBar.js';
import "../../src/styles/Browse.css";
import Result from './Result.js';

class BrowseRecipe extends React.Component {
    state = {
        keywords: "",
        // recipes will be imported from database
        recipes: [                                                            
            {id:2, recipeName: "Grilled Pork Chops with Smoked Paprika Rub", 
                tags: ["omnivore", "pork"]},
            {id:3, recipeName: "Air-Fried Frozen Salmon", 
                tags: ["pescatarian", "salmon"]},
            {id: 4, recipeName: "Golden Chicken", 
                tags: ["omnivore", "chicken"]},
            {id: 1, recipeName: "Creamy Broccoli Vegan Pasta", 
                tags: ["vegetarian", "pasta", "broccoli"]},
            {id: 5, recipeName: "Slow Cooker Sweet and Sour Chicken Thighs", 
                tags: ["omnivore", "chicken"]},
        ],
        results: [],
        noResult: false
    }

    handleChange = event => {
        const target = event.target;
        this.setState({
          [target.name]: target.value
        });
    }

    search = () => {
        const inputTags = this.state.keywords.split(' ');
        let output = [];
        for (let i=0; i <inputTags.length; i++) {
            let tt = inputTags[i].toLowerCase();
            let partial = this.state.recipes.filter(r => {
                return r.tags.includes(tt)
            })
            output = output.concat(partial)
        }
        // output = output.map(r => r.recipeName)
        output = output.filter((item, pos) => {
            return output.indexOf(item)== pos; 
        })
        this.setState({
            results: output
        })
        
        output.length === 0 ?
            this.setState({noResult: true}) : this.setState({noResult: false})
    }

    render() {
        return (
            <div className='main'>
                <SearchBar name='keywords' keywords={this.state.keywords} handleChange={this.handleChange} search={this.search} />
                <p className='gap'></p>
                {
                    this.state.noResult ?
                    <div>
                        <h3>Sorry, Your search did not match any documents.</h3>
                        <h3>Suggestions: Make sure that all words are spelled correctly. Try different keywords.</h3>
                    </div>                        
                    : this.state.results.map(r => (<Result id={r.id} title={r.recipeName} tags={r.tags} />))
                }
                
            </div>
        );  
    }
}

export default BrowseRecipe;