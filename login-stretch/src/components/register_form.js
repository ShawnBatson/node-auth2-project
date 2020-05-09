import React, { useState } from "react";
import "../App.css";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const RegisterForm = (props) => {
    const [registration, setRegistration] = useState({
        username: "",
        password: "",
        department: "",
    });

    const handleChange = (event) => {
        console.log(event.target.name);
        setRegistration({
            ...registration,
            [event.target.name]: event.target.value,
        });
    };

    const register = (event) => {
        event.preventDefault();
        axiosWithAuth()
            .post("/auth/register", registration, { withCredentials: true }) //STUDY THIS X3X
            .then((res) => {
                console.log("this is in the registration event", res);
                localStorage.setItem("token", res.data.token);
                props.history.push("/users");
            })
            .catch((err) => {
                console.log("error in the register catch", err);
            });
    };

    return (
        <div>
            <form className="register-form" onSubmit={register}>
                <input
                    className="login"
                    type="text"
                    name="username"
                    value={register.username}
                    placeholder="Please choose a login name"
                    onChange={handleChange}
                />
                <input
                    className="password"
                    type="password"
                    name="password"
                    value={register.password}
                    placeholder="Please choose a password"
                    onChange={handleChange}
                />
                <input
                    className="department"
                    type="text"
                    name="department"
                    value={register.department}
                    placeholder="Please enter your department"
                    onChange={handleChange}
                />
                <button>Register</button>
            </form>
        </div>
    );
};
