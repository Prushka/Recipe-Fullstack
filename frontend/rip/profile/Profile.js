import React from 'react'; 
import SideBar from '../../src/pages/SideBar.js'
import My_text from './my_text.js';
import Type from './type.js';
import "../../src/styles/profile_style.css"
import food from "../../src/resources/food.jpg"

class Profile extends React.Component {
  // the state information will be imported from database
  state = {
    username: "hello",
    gender: "other",
    email: "abcdefh@gmail.com",
    birthday: "31/01/2010",
    type: "omnivore",
    avatar: null
  };

  handleInputChange = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    })
  }
  
  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        avatar: URL.createObjectURL(img)
      });
    }
  };

  handle_vegan = () => {
    this.setState({
      type: "Vegetarian"
    })
  }

  handle_pes = () => {
    this.setState({
      type: "Pescatarian"
    })
  }

  handle_om = () => {
    this.setState({
      type: "Omnivore"
    })
  }

  render() {
    return (
      <div className='account'>
        <div className='center'>
          {this.state.avatar? <img src={this.state.avatar} className='profile_pic'/> :<img src={food} className='profile_pic'/>}
          <h4 className='text1'>Profile Picture</h4>
          <input type='file' onChange={this.onImageChange} className='choose center'/>
          <button type='submit' className='updatePic'>Update</button>
        </div>

        <div className='username'>
          <My_text name="username" content={this.state.username} label="Userame" onChange={this.handleInputChange} />
        </div>

        <div className='gender'>
          <My_text name="gender" content={this.state.gender} label="Female/Male/Other" onChange={this.handleInputChange} />
        </div>
        
        <div className='email'>
          <My_text name="email" content={this.state.email} label="email" onChange={this.handleInputChange} />
        </div>

        <div className='bday'>
          <My_text name="birthday" content={this.state.birthday} label="DD/MM/YYYY" onChange={this.handleInputChange} />
        </div>

        <div className='type'>
          <Type handleVegan={this.handle_vegan} handlePes={this.handle_pes} handleOm={this.handle_om} content={this.state.type}  />
        </div>
      </div>
    );
  }
}

export default Profile;