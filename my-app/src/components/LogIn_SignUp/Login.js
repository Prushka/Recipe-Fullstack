import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    state = {
        username: "",
        password: "",
        error: false,
    };

    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({ [name]: value })
    };

    handelClick(event) {
        //hard code database
        const user_date = [
            {
                username: "user1",
                password: "user1"
            },
            {
                username: "user2",
                password: "user2"
            }
        ];

        //check existence of username
        const checkExist = user_date.find((user) => user.username === this.state.username);

        if (!checkExist) {
            console.log("user does not exist")
            this.setState({
                error: true
            })
        } else {
            if (checkExist.password !== this.state.password) {
                console.log("wrong password")
                this.setState({
                    error: true
                })
            }
        }
    }


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
                                className='input'
                                value={this.state.username}
                                onChange={event => this.handleChange(event)}
                                required
                            />
                        </form>
                        <form>
                            <input
                                type="password"
                                name="password"
                                placeholder="password..."
                                className='input'
                                value={this.state.password}
                                onChange={event => this.handleChange(event)}
                                required
                            />
                        </form>
                    </div>
                    <div>
                        <button type='submit' name='submit' className='form_login'
                            onClick={event => this.handelClick(event)}>
                            LOG-IN
                        </button>

                        {this.state.error ? <div className='error_msg'>username and password unmatch</div> : <Link to={'/home'} />}


                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;


// check if user name exist

// check passwords
