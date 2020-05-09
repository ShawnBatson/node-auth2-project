import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import "../App.css";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axiosWithAuth()
            .get("/users", { withCredentials: true })
            .then((res) => {
                console.log("this is in users", res.data);
                setUsers(res.data);
            })
            .catch((err) => {
                console.log("error in usersList", err);
            });
    }, []);

    const logout = (props) => {
        localStorage.removeItem("token");
        props.history.push("/login");
    };

    return (
        <div>
            <div className="userCard">
                {users.map((user) => (
                    <div className="individualCard">
                        <h1 className="userCardWriting">{user.username}</h1>
                        <h2 className="userCardWriting">{user.department}</h2>
                    </div>
                ))}
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default UsersList;
