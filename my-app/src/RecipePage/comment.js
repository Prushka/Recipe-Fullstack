import React from 'react'; 
import "./RecipeStyle.css"



class Comment extends React.Component {

  state = {
 
  }

  
  render() {
    const {comment} = this.props

    return (
        <div className='comment'>
            <h5>{comment.username} :</h5>
            <p>{comment.content}</p>
        </div>
    );  
  }
}
  
  export default Comment;