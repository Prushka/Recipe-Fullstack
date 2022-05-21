import React from 'react'; 
import CommentSection from './commentSection';
import "../../styles/RecipeStyle.css"
import Thumbs from './thumbs.js'
import veganFood from "../../resources/vegan-food.jpg"



class RecipePage1 extends React.Component {
  // the state information will be imported from database
  state = {
    id: 1,
    currentUser: 'User',
    title: 'Creamy Broccoli Vegan Pasta',
    author: 'Sudden Lee',
    keywords: 'Vegetarian, Pasta',
    ingredient: 'White beans, Lemon Juice, Olive oil, Nutritional yeast, Onion powder&garlic, ' +
                'Vegetable broth,Pasta, Broccoli and chopped up broccoli stems, And pine nuts',
    instruction: 'Step 1: Switch the vegetables. Sautéed broccoli and onion are my go-to veggies here,' +
                  'but roasted broccoli, roasted cauliflower or Brussels sprouts would also be delicious.' +
                  'In the summer, stir in roasted tomatoes. In the spring, add market-fresh asparagus.\n' +
                  'Step 2: Skip the actual pasta. Instead of regular pasta, serve this sauce over spaghetti' +
                  'squash or zucchini noodles. \nStep 3: Spice it up. I love adding a few pinches of red pepper flakes to my bowl.' + 
                  'Pickled jalapeños would be another fun, punchy addition.',  
    comments: [
        {username: 'Jessie', content: 'LOVE IT!'},
        {username: 'Jay', content: 'Great vegan recipe!'}
    ],
    newContent: ""         
  }

  handleChange = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  addComment= () => {
    const newComments = this.state.comments;
    const NewComment = {username: this.state.currentUser, content: this.state.newContent};
    newComments.push(NewComment);
    this.setState({
      comments: newComments,
    })
    this.setState({
      newContent: " "
    })
  }

  render() {
    const paragraphs = this.state.instruction.split('\n');

    return (
      <div className='main'>
        <div className='inner'>
          <h1 className='title'>{this.state.title}</h1>
          <h5>Author: {this.state.author}</h5>
          <h5>Keywords: {this.state.keywords}</h5>
          <img src={veganFood} className='image' />
          <h4 className='subtitle'>Ingredient:</h4>
          <p className='paragraph'>{this.state.ingredient}</p>
          <h4 className='subtitle'>Instruction:</h4>
          {paragraphs.map(par => <p className='paragraph'>{par}</p>)}      
          <Thumbs/>
          <CommentSection user={this.state.currentUser} comments={this.state.comments} 
            newContent={this.state.newContent} handleChange={this.handleChange} addComment={this.addComment}/>
        </div>
      </div>
    );  
  }
}
  
export default RecipePage1;