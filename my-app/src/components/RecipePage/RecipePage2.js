import React from 'react'; 
import CommentSection from './commentSection';
import "../../styles/RecipeStyle.css"
import Thumbs from './thumbs.js'
import porkChop from "../../resources/pork-chop.jpg"




class RecipePage2 extends React.Component {
  // the state information will be imported from database
  state = {
    id: 2,
    currentUser: 'User',
    title: 'Grilled Pork Chops with Smoked Paprika Rub',
    author: 'Absolute Lee',
    keywords: 'Omnivore, Pork',
    ingredient: 'boneless pork loin chops, avocado cooking oil spray, smoked paprika, kosher salt, black pepper',
    instruction: 'Combine smoked paprika, salt, pepper, onion powder, garlic, and cayenne in a small bowl.\n'+
                'Pat chops dry with a paper towel and evenly distribute dry ingredient mixture on' +
                'front and back of each chop. With fingertips, lightly rub dry ingredient mixture into the chops on both sides\n' +
                'Place chops on a plate and cover with plastic wrap. Refrigerate for at least 8 hours.',  
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
          <img src={porkChop} className='image' />
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
  
export default RecipePage2;