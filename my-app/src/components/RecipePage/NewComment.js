import React from 'react'; 
import "../../styles/RecipeStyle.css"
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


class NewComment extends React.Component {

  state = {
    
  }

  
  render() {
    const {name, content, handleChange, addComment} = this.props;
    
    return (
        <div>
            <TextField fullWidth name={name} variant='outlined' value={content} label='Add a Comment' onChange={handleChange} margin='normal' />
            <Button variant="contained" color='primary' size="small" onClick={addComment} className='postButton' >Post Comment</Button>
        </div>
        
    );  
  }
}
  
export default NewComment;