import React, { useState } from "react";

const Login = props => {

    const initialUserState = {
        name: "",
        password: "",
    };

    const [user, setUser] = useState(initialUserState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const login = () => {
        //refers to the login method from the login route of App.js
        props.login(user)
        props.history.push('/');
    }

    return (
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="user">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        password="name"
                        required
                        value={user.name}
                        onChange={handleInputChange}
                        name="name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        className="form-control"
                        password="password"
                        required
                        value={user.password}
                        onChange={handleInputChange}
                        name="password"
                    />
                </div>

                <button onClick={login} className="btn btn-success">
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;