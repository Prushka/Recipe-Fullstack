import React from 'react'; 
import SideBar from '../../pages/SideBar.js'
import My_text from './my_text.js';
import Type from './type.js';
import "../../styles/profile_style"
import food from "../../resources/food.jpg"

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "hello",
      gender: "other",
      email: "abcdefh@gmail.com",
      bday: "31/01/2010",
      type: "omnivore",
      avatar: null
    };
    this.onImageChange = this.onImageChange.bind(this);
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
      <>
        <div className='side'>
          <SideBar />
        </div>

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
            <My_text name="bday" content={this.state.bday} label="DD/MM/YYYY" onChange={this.handleInputChange} />
          </div>

          <div className='type'>
            <Type handleVegan={this.handle_vegan} handlePes={this.handle_pes} handleOm={this.handle_om} content={this.state.type}  />
          </div>

        </div>
      </>
    );
  }
}

export default Profile;