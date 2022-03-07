import React from 'react'; 
import CommentSection from './commentSection';
import "../../styles/RecipeStyle.css"
import Thumbs from './thumbs.js'
import chicken from "../../resources/chicken.jpg"



class RecipePage4 extends React.Component {
  // the state information will be imported from database
  state = {
    id: 4,
    currentUser: 'User',
    title: 'Golden Chicken',
    author: 'Procrastination Is My Middle Name',
    keywords: 'Omnivore, Chicken',
    ingredient: 'chicken leg quarters, salt, olive oil, diced onion, diced celery, jalapeño pepper, cumin, smoked paprika, coriander',
    instruction: 'Make two cuts, about 1 inch apart, right in the center of each thigh. Season both sides generously with 2 teaspoons kosher salt.\n'+
                'Heat oil in a large skillet over high heat. Add chicken, skin-side down, and sear until skin is nicely browned, 5 to 6 minutes. Flip and sear for 2'+ 
                'more minutes. Turn off the heat and remove chicken to a plate, leaving any rendered fat in the skillet\n' +
                'Turn the heat back on to medium; add onion, celery, jalapeño, and a pinch of salt to the skillet. Sauté until onion turns translucent and '+
                'veggies have softened, 5 to 7 minutes. Add cumin, paprika, coriander, turmeric, pepper, cayenne, cinnamon, and '+
                'garlic; cook and stir until garlic has cooked a bit and spices are toasted, about 2 minutes.\n'+
                'Stir in tomato paste, vinegar, water, and saffron. Increase heat to high and stir in currants and '+
                'chicken base; bring to a simmer.',
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
          <img src={chicken} className='image' />
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
  
export default RecipePage4;