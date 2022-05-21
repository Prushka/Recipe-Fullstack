import React from 'react'; 
import "../../styles/RecipeStyle.css"
import Comment from './comment.js';
import { uid } from "react-uid";
import NewComment from './NewComment';



class CommentSection extends React.Component {

  render() {
    const {comments, newContent, handleChange, addComment} = this.props;

    return (
        <div>
            <h3 className='subtitle'>Comments:</h3>
            <NewComment name="newContent" content={newContent} handleChange={handleChange} 
              addComment={addComment}/>
            {
                comments.map(comment => (
                    <Comment key={uid(comment)} comment={comment}/>
                ))
            }
        </div>
    );  
  }
}
  
  export default CommentSection;