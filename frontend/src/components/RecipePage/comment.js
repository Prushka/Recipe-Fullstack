import React from 'react'; 
import "../../styles/RecipeStyle.css"
import ReportIcon from '@material-ui/icons/Report';
import Button from "@material-ui/core/Button";  


class Comment extends React.Component {

  state = {
 
  }

  
  render() {
    const {comment} = this.props

    return (
        <div>
            <h5>{comment.username} :</h5>
            <span className='content'>{comment.content}</span>
            <Button size='small' className='report'><ReportIcon/>Report</Button>
        </div>
    );  
  }
}
  
  export default Comment;