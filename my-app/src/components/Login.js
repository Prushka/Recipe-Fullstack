import React from 'react';

class Login extends React.Component {
    state = {
        username: '',
        pwd: ''

    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <h1>Log-in</h1>
                </div>
                <div>
                    <form>
                        <input type='username' name='username' placeholder='username...' required />

                    </form>
                    <form>
                        <input type='password' name='pwd' placeholder='password...' required />
                    </form>
                    <form>
                        <button>Log-in</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Login;