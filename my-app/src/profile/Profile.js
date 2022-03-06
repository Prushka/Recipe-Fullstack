import React from 'react'; 
import Sidebar from '../components/Sidebar.js'
import My_text from './my_text.js';
import Type from './type.js';
import "./profile_style.css"

class Profile extends React.Component {
  state = {
    username: "hello",
    gender: "other",
    email: "abcdefh@gmail.com",
    bday: "31/01/2010",
    type: "omnivore",
    avatar: ""
  };

  handleInputChange = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.value 
    });
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

  selectHandler = event => {
    this.setState({avatar: event.target.files[0]})
  }

  render() {
    return (
      <>
        <div className='side'>
          <Sidebar />
        </div>

        <div className='account'>
          <div className='profile_pic center'>
            <h4 className='text1'>Profile Picture</h4>
            <input type='file' onChange={this.selectHandler} className='choose center'/>
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