import React from 'react'; 
import Button from "@material-ui/core/Button";
import "../../src/styles/profile_style.css"



class Type extends React.Component {

  state = {
    edit: false
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }


  render() {
    const {handleVegan, handlePes, handleOm, content} = this.props;

    return (
      <div>
        <span className='big_text'>Type:</span>
        {
            this.state.edit ?
            <div>
                <Button variant='outlined' size='small' onClick={handleVegan} >Vegetarian</Button>
                <span>   </span>
                <Button variant='outlined' size='small' onClick={handlePes} >Pescatarian</Button>
                <span>   </span>
                <Button variant='outlined' size='small' onClick={handleOm} >Omnivore</Button>
                <span>   </span>
                <Button variant="contained" size="small" onClick={this.toggleEdit} >Update</Button>
            </div>
            :
            <div>
                <span className='text2'> {content} </span>
                <Button variant="contained" size="small" onClick={this.toggleEdit} className='button1' >Edit</Button>
            </div>
        }
      </div>
    );  
  }
}
  
  export default Type;