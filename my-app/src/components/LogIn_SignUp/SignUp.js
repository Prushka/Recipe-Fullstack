import React from 'react';
import './Login.css';
import './SignUp.css';
import { Link } from 'react-router-dom';
import useForm from './useForm';
import validate from './ValidateInfoCheck';


const SignUp =()=> {
    const { handleChange,handelSubmit,values,errors}=useForm(validate);
    /*state = {
        username: "",
        email: "",
        pwd: "",
        pwdConfirmation: ""
    };*/
    //render() {
        return (
            <React.Fragment>
                <div className="login">
                    <div className="login_banner">
                        <p>Recipe...</p>
                    </div>
                    <div>
                        <h1>Sign-Up</h1>
                    </div>
                    <div className="form-inputs">
                        <form className='form' onSubmit={handelSubmit}>
                            <input
                                type="username"
                                name="username"
                                placeholder="username..."
                                required
                                value={values.username}
                                onChange={handleChange}
                            />
                        </form>
                        <form>
                            <input
                                type="email"
                                name="email"
                                placeholder="email..."
                                required
                                value={values.email}
                                onChange={handleChange}
                            />
                            {errors.username &&<p>{errors.username}</p>}
                        </form>
                        <form>
                            <input
                                type="password"
                                name="pwd"
                                placeholder="password..."
                                required
                                value={values.pwd}
                                onChange={handleChange}
                            />
                        </form>
                        <form>
                            <input
                                type="password"
                                name="pwd2"
                                placeholder="comfirm password..."
                                required
                                value={values.pwd2}
                                onChange={handleChange}
                            />
                        </form>
                    </div>
                    <div>
                        <Link to={"/home"}>
                            <button >SUBMIT</button>
                        </Link>

                    </div>
                    <div className='back'>
                        <Link to={"/login"} style={{ textDecoration: 'none' }}>
                            <button>Back to login</button>
                        </Link>
                        
                    </div>
                </div>
            </React.Fragment>
        );
    }
//}

export default SignUp;

