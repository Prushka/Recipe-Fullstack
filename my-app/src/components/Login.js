import React from 'react';

class Login extends React.Component {
    state = {
        username:'',
        pwd:''

    }
    render() {
        return (
            <div>
                <div>
                    <form>
                        <input type='username' name='username' placeholder='username...' required />
                        <input type='password' name='pwd' placeholder='password...' required />
                        <button>Log-in</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;