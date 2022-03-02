import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    state = {
        username: "",
        pwd: ""
    };
    render() {
        return (
            <React.Fragment>
                <div className="login">
                    <div className="login_banner">
                        <p>Recipe...</p>
                    </div>
                    <div><h1>Log-in</h1></div>
                    <div className="form-inputs">
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
                                type="password"
                                name="pwd"
                                placeholder="password..."
                                required
                            />
                        </form>
                    </div>
                    <div>
                        <Link to={"/home"}>
                            <button>LOGIN</button>
                        </Link>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;


// check if user name exist

// check passwords
