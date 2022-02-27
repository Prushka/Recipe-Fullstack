import React from 'react';
import './login.css';
import './SignUp.css';


class SignUp extends React.Component {
    state = {
        username: "",
        email:"",
        pwd: "",
        repeat_pwd:""
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
                                type="repeat password"
                                name="repeat_pwd"
                                placeholder="repeat password..."
                                required
                            />
                        </form>
                    </div>
                    <div>
                        <button>SUBMIT</button>
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


