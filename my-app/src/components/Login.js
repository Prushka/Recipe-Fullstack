import React from 'react';
import './login.css';
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
                                type="password"
                                name="pwd"
                                placeholder="password..."
                                required
                            />
                        </form>
                    </div>
                    <div>
                        <button>LOGIN</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;
