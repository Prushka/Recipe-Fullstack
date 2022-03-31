import React from 'react';
import './Login.css';
import './SignUp.css';
import { Link } from 'react-router-dom';
import useForm from './useForm';
import validate from './ValidateInfoCheck';


const SignUp = () => {
    const { handleChange, handelSubmit, values, errors } = useForm(validate);

    return (
        <React.Fragment>
            <div className="signup">
                <div className="signup_banner">
                    <p>Recipe...</p>
                </div>
                <div>
                    <h1 className='signup_text'>Sign-Up</h1>
                </div>
                <div className="form-inputs">
                    <form className='signup_form' onSubmit={handelSubmit}>
                        <input className='signup_input'
                            type="username"
                            name="username"
                            placeholder="username..."
                            required
                            value={values.username}
                            onChange={handleChange}
                        />
                    </form>
                    <form className="signup_form">
                        <input
                            className='signup_input'
                            type="email"
                            name="email"
                            placeholder="email..."
                            required
                            value={values.email}
                            onChange={handleChange}
                        />
                        {errors.username && <p>{errors.username}</p>}
                    </form>
                    <form className="signup_form">
                        <input
                            className='signup_input'
                            type="password"
                            name="pwd"
                            placeholder="password..."
                            required
                            value={values.pwd}
                            onChange={handleChange}
                        />
                    </form>
                    <form className="signup_form">
                        <input
                            className='signup_input'
                            type="password"
                            name="pwd2"
                            placeholder="comfirm password..."
                            required
                            value={values.pwd2}
                            onChange={handleChange}
                        />
                        {errors.pwd2 && <p>{errors.pwd2}</p>}
                    </form>
                </div>
                <div>
                    <Link to={"/profile"}>
                        <button className="signup_submit_button">SUBMIT</button>
                    </Link>

                </div>
                <div >
                    <Link to={"/login"} style={{ textDecoration: 'none' }}>
                        <div className='back_button'>
                            <u>Back to login</u>
                        </div>
                    </Link>

                </div>
            </div>
        </React.Fragment>
    );
}
//}

export default SignUp;

