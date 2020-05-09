import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import "../App.css";

export const LoginForm = (props) => {
    console.log("props", props);
    const [userInfo, setUserInfo] = useState({
        credentials: {
            username: "",
            password: "",
        },
    });

    const handleChange = (event) => {
        setUserInfo({
            credentials: {
                ...userInfo.credentials,
                [event.target.name]: event.target.value,
            },
        });
    };

    const login = (event) => {
        event.preventDefault();
        axiosWithAuth()
            .post("/auth/login", userInfo.credentials)
            .then((res) => {
                console.log("this is in the login event", res);
                localStorage.setItem("token", res.data.token);
                props.history.push("/users");
            })
            .catch((err) => {
                console.log("error in login event catch", err);
            });
    };

    return (
        <div>
            <form onSubmit={login} className="Main">
                <input
                    className="login"
                    type="text"
                    value={userInfo.username}
                    name="username"
                    placeholder="login"
                    onChange={handleChange}
                />
                <input
                    className="password"
                    type="password"
                    value={userInfo.password}
                    name="password"
                    placeholder="password"
                    onChange={handleChange}
                />
                <button>Login</button>
            </form>
        </div>
    );
};
