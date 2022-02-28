import React from 'react';
import './Login.css';
import './SignUp.css';
import { Link } from 'react-router-dom';


class SignUp extends React.Component {
    state = {
        username: "",
        email: "",
        pwd: ""
    };
    render() {
        return (
            <React.Fragment>
                <div className="login">
                    <div className="login_banner">
                        <p>Recipe...</p>
                    </div>
                    <div>
                        <h1>Sign-Up</h1>
                    </div>
                    <div className="login_box">
                        <form>
                            <input
                                type="username"
                                name="username"
                                placeholder="username..."
                                required
                            />
                        </form>
                        <form>
                            <input
                                type="email"
                                name="email"
                                placeholder="email..."
                                required
                            />
                        </form>
                        <form>
                            <input
                                type="password"
                                name="pwd"
                                placeholder="password..."
                                required
                            />
                        </form>
                        <form>
                            <input
                                type="password"
                                name="pwd"
                                placeholder="repeat password..."
                                required
                            />
                        </form>
                    </div>
                    <div>
                        <Link to={"/home"}>
                            <button>SUBMIT</button>
                        </Link>

                    </div>
                    <div className='back'>
                        <button>Back to login</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SignUp;


