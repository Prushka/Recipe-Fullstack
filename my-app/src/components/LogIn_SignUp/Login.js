import React from 'react';
import './Login.css';
import {Link} from 'react-router-dom';

export default function Login({userState, setUserState}) {
    const handleChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        setUserState(name, value)
    };

    const handelClick = (event) => {
        //hard code database
        const user_date = [
            {
                username: "user1",
                password: "user1"
            },
            {
                username: "user2",
                password: "user2"
            },
            {
                username: "admin",
                password: "admin"
            }
        ];

        //check existence of username
        const checkExist = user_date.find((user) => user.username === userState.username);

        if (!checkExist) {
            console.log("user does not exist")
            setUserState("error", true)
        } else {
            if (checkExist.password !== userState.password) {
                console.log("wrong password")
                setUserState("error", true)
            } else {
                console.log("valid input")
                setUserState("valid", true)
            }

            if (checkExist.username === "admin") {
                console.log("Admin login")
                setUserState("adminCheck", true)
            }
        }
    }


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
                            value={userState.username}
                            onChange={event => handleChange(event)}
                            required
                        />
                    </form>
                    <form>
                        <input
                            type="password"
                            name="password"
                            placeholder="password..."
                            className='input'
                            value={userState.password}
                            onChange={event => handleChange(event)}
                            required
                        />
                    </form>
                </div>
                <div onClick={event => handelClick(event)}>
                    <button>SUBMIT</button>
                    {/* If valid log in*/}
                </div>
                {/*<div>
                        {userData.valid ? <Link to={'/home'}><button>LOG-IN</button></Link> : null}
                    </div>*/}
                <div>
                    {/*if adminCheck == true link to admin page */}
                    {userState.valid ? (userState.adminCheck ? <Link to={'/dashboard'}>
                                <button>LOG-IN</button>
                            </Link>
                            : <Link to={'/dashboard'}>
                                <button>LOG-IN</button>
                            </Link>)
                        : null}
                </div>

                {userState.error ? <div className='error_msg'>username and password unmatch</div> : null}


                <Link to={'/signup'}>
                    <div className='link_to_sign_up'>
                        <u>No account? create an account</u>
                    </div>

                </Link>


            </div>
        </React.Fragment>
    );
}

// check if user name exist

// check passwords
