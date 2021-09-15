import React, { useState } from "react";
import DataService from "../services/Service";

const Login = props => {

    const [wrongLogin, setWrongLogin] = React.useState(false);

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

        let loginData = {
            userId: user.name,
            password: user.password
        }

        DataService.doLogin(loginData)
            .then(response => {
                if(response.data.access !== false)
                {
                    props.login(user)
                    props.history.push("/map");
                } else {
                    setWrongLogin(true);
                }

            });
    }

    return (
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="user">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
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
                        className={wrongLogin ? ("form-control is-invalid") : ("form-control")}
                        id="password"
                        required
                        value={user.password}
                        onChange={handleInputChange}
                        name="password"
                    />
                    <div className="invalid-feedback">
                        Keinen Eintrag mit diesen Zugangsdaten gefunden.
                    </div>
                </div>

                <button onClick={login} className="btn btn-success">
                    Login
                </button>
            </div>
        </div>
    )
};

export default Login;