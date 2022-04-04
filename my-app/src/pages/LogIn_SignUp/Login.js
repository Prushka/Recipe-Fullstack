import React from 'react';
import './Login.css';
import {useNavigate} from 'react-router-dom';
import {BlueBGButton} from "../../components/input/Button";
import {TextField} from "../../components/input/TextField";

export default function Login({userState, setUserState}) {
    const navigate = useNavigate()
    const handleChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        setUserState(name, value)
    };
    return (
        <>
            <div className="login">
                <div className="login__text">Log-in</div>
                <TextField label="Username" className='login_input'
                           type="username"
                           name="username"
                           placeholder="username..."
                           value={userState.username}
                           onChange={event => handleChange(event)}
                           required
                />
                <TextField label="Password" className='login_input'
                           type="password"
                           name="password"
                           placeholder="password..."
                           value={userState.password}
                           onChange={event => handleChange(event)}
                           required
                />
                <BlueBGButton onClick={(e) => {
                }} className='login_submit_button'>SUBMIT</BlueBGButton>


                <p onClick={() => navigate('/signup')} className='link_to_sign_up'>
                    <u>No account? create an account</u>
                </p>

                <div className='error_msg'>
                    {userState.error ? <div className='error_msg_output'>username and password unmatch</div> : null}
                </div>
            </div>
        </>
    );
}

// check if user name exist

// check passwords
