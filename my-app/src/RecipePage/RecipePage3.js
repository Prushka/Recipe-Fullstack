import React from 'react'; 
import CommentSection from './commentSection';
import "./RecipeStyle.css"
import Thumbs from './thumbs.js'
import salmon from "./salmon.jpg"



class RecipePage3 extends React.Component {

  state = {
    id: 3,
    currentUser: 'User',
    title: 'Air-Fried Frozen Salmon',
    author: 'Not Telling You',
    keywords: 'pescatarian, Salmon',
    ingredient: 'Dijon mustard, honey, balsamic vinegar, garlic, salt, black pepper, salmon fillets ', 
    instruction: 'Preheat the oven to 390 degrees F (190 degrees C). Spray the air fryer basket with cooking spray.\n' +
                  'Mix Dijon, honey, balsamic vinegar, garlic, salt, and pepper together in a small bowl.\n' +
                  'Place frozen salmon fillets in the prepared air fryer basket. Place in the preheated air fryer and cook for 5 minutes.\n' +
                  'Brush Dijon mixture over the fillets and continue to air-fry until fish flakes easily with a fork, about 5 more minutes.\n',
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
        <h1 className='title'>{this.state.title}</h1>
        <h5>Author: {this.state.author}</h5>
        <h5>Keywords: {this.state.keywords}</h5>
        <img src={salmon} className='image' />
        <h4 className='subtitle'>Ingredient:</h4>
        <p>{this.state.ingredient}</p>
        <h4 className='subtitle'>Instruction:</h4>
        {paragraphs.map(par => <p>{par}</p>)}      
        <Thumbs/>
        <CommentSection user={this.state.currentUser} comments={this.state.comments} 
          newContent={this.state.newContent} handleChange={this.handleChange} addComment={this.addComment}/>
      </div>
    );  
  }
}
  
export default RecipePage3;