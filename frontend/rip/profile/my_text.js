import React from 'react'; 
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "../../src/styles/profile_style.css"



class My_text extends React.Component {

  state = {
    edit: false
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  render() {
    const {name, content, label, onChange} = this.props;

    return (
      <div>
        <span className='big_text'>{name}:</span>
      {
        this.state.edit ?
        <div>
          <TextField 
            name = {name}
            label = {label}
            defaultValue = {content}
            className = "input"
            onChange = {onChange}
          /> 
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
  
  export default My_text;